import React, {
  Fragment, useCallback, useMemo, useState,
} from 'react';
import {
  TextField, Box, CircularProgress, Divider, Grid, IconButton, Paper, Table, TableBody,
  TableCell, TableRow, Typography, TableContainer, Toolbar, Tooltip,
} from '@mui/material';
import {
  CreateRoom, CreateSlot, Room, Slot,
} from 'coliving-erp-api-client';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useApiFetch } from '../../api/useApiFetch';
import { useApi } from '../../providers/ApiClient';
import { ProgressButton } from '../../components/common/ProgressButton';

interface RoomWithSlots {
  id: number;
  name: string;
  slots: Slot[];
}

interface RoomSlotsTableProps {
  roomId: number;
  slots: Slot[];
}

function RoomSlotsTable({ roomId, slots }: RoomSlotsTableProps) {
  const [newSlotFormShown, setNewSlotFromShown] = useState(false);

  const [newSlotName, setNewSlotName] = useState('');
  const [createPending, setCreatePending] = useState(false);
  const { slotsApi } = useApi();
  const handleSaveNewSlot = useCallback(() => {
    setCreatePending(true);
    const createSlot: CreateSlot = {
      label: newSlotName,
      roomId,
    };
    slotsApi.createSlot(createSlot)
      .then(() => {
        setNewSlotFromShown(false);
        setNewSlotName('');
      })
      .finally(() => {
        setCreatePending(false);
      });
  }, [newSlotName, slotsApi, roomId]);

  return (
    <TableContainer>
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography sx={{ flex: '1 1 100%' }}>
          Slots
        </Typography>
        <Tooltip title="add slot">
          <IconButton disabled={newSlotFormShown} onClick={() => setNewSlotFromShown(true)}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Table>
        <TableBody>
          {
              slots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>{slot.id}</TableCell>
                  <TableCell>{slot.label}</TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          { newSlotFormShown && (
          <TableRow>
            <TableCell />
            <TableCell>
              <TextField label="name" value={newSlotName} onChange={(e) => setNewSlotName(e.target.value)} />
            </TableCell>
            <TableCell>
              {!!createPending && <CircularProgress />}
              <IconButton onClick={handleSaveNewSlot}>
                <SaveIcon />
              </IconButton>
              <IconButton onClick={() => setNewSlotFromShown(false)}>
                <CancelIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface RoomSectionProps {
  data: RoomWithSlots
}

function RoomSection({ data }: RoomSectionProps) {
  return (
    <Grid container component={Box} sx={{ padding: 2 }}>
      <Grid item md={10} xs={10}>
        <Typography>
          #
          {data.id}
          {' '}
          { data.name}
        </Typography>
      </Grid>
      <Grid item md={2} xs={2}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid item lg={12} xs={12}>
        <RoomSlotsTable roomId={data.id} slots={data.slots} />
      </Grid>
    </Grid>
  );
}
interface AddRoomFormProps {
  houseId: number;
  onCreated: (newRoom: Room) => void
}
function AddRoomForm({ onCreated, houseId }: AddRoomFormProps) {
  const [name, setName] = useState('');

  const [createRoomPending, setCreateRoomPending] = useState(false);
  const { roomsApi } = useApi();
  const handleCreateRoomClick = useCallback(() => {
    const cancelled = false;
    const createRoom: CreateRoom = {
      name,
      houseId,
    };
    setCreateRoomPending(true);
    roomsApi.createRoom(createRoom)
      .then(({ data }) => {
        onCreated(data);
      })
      .finally(() => { setCreateRoomPending(false); });
    return () => cancelled;
  }, [roomsApi, houseId, onCreated, name]);
  return (
    <Grid container alignItems="center">
      <Grid item>
        <TextField
          label="name"
          value={name}
          disabled={createRoomPending}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>

      <Grid item>
        <ProgressButton
          pending={createRoomPending}
          onClick={handleCreateRoomClick}
        >
          Add room
        </ProgressButton>
      </Grid>

    </Grid>
  );
}

export interface RoomsSectionProps {
  houseId: number;
}

function RoomsSection({ houseId } : RoomsSectionProps) {
  const { roomsApi, slotsApi } = useApi();

  const [rooms, roomsPending] = useApiFetch<Room[]>(() => roomsApi.listRooms().then((res) => ({
    ...res,
    data: res.data.filter((i) => i.house?.id),
  })), [houseId, roomsApi]);

  const [slots, slotsPending] = useApiFetch<Slot[]>(() => slotsApi.listSlots().then((res) => ({
    ...res,
    data: res.data.filter((i) => i.room?.house?.id),
  })), [houseId, roomsApi]);

  const roomsWithSlots: RoomWithSlots[] | undefined = useMemo(() => {
    if (!rooms || !slots) {
      return undefined;
    }
    return rooms.map((room) => {
      const roomSlots = slots.filter((slot) => slot.room?.id === room.id);
      return {
        id: room.id!,
        name: room.name!,
        slots: roomSlots,
      };
    });
  }, [rooms, slots]);

  return (
    <Paper>
      { (roomsPending || slotsPending) && <CircularProgress />}
      { roomsWithSlots && roomsWithSlots.map((room) => (
        <Fragment key={room.id}>
          <RoomSection data={room} />
          <Divider />
        </Fragment>
      ))}
      <Box sx={{ padding: 2 }}>
        <AddRoomForm
          onCreated={() => {}}
          houseId={houseId}
        />
      </Box>
    </Paper>
  );
}

export default RoomsSection;
