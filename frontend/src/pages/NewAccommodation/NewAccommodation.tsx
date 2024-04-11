import {
  Button,
  CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography,
} from '@mui/material';
import {
  CreateAccommodation, HouseDto, Resident, Room, Slot,
} from 'coliving-erp-api-client';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { differenceInDays, differenceInMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ProgressButton } from '../../components/common/ProgressButton';
import { ResidentSelect } from '../../components/common/ResidentSelect';
import { useServerData } from '../../providers/ServerData';
import { useDataFetch } from '../../api/useApiFetch';
import { SmartChooseHouseDialog } from '../../components/common/smart/SmartChooseHouseDialog';

function NewAccommodation() {
  const {
    residents: residentsRepo, rooms: roomsRepo,
    slots: slotsRepo, accommodations: accommodationsRepo,
  } = useServerData();

  const [residents, residentsPending] = useDataFetch<Resident[]>(() => residentsRepo.list(), []);
  const [residentId, setResidentId] = useState<Resident | undefined>();

  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const [house, setHouse] = useState<HouseDto>();

  const [rooms, roomsPending] = useDataFetch<Room[] | undefined>(() => {
    if (house?.id === undefined) {
      return Promise.resolve([]);
    }
    return roomsRepo.list().then((res) => (res.filter((i) => i.house?.id === house?.id)));
  }, [house]);
  const roomOptions = useMemo(() => rooms ?? [], [rooms]);
  const [roomId, setRoomId] = useState<number | undefined>();
  useEffect(() => setRoomId(undefined), [house]);

  const [slots, slotsPending] = useDataFetch<Slot[] | undefined>(() => {
    if (roomId === undefined) {
      return Promise.resolve([]);
    }
    return slotsRepo.list().then((data) => data.filter((i) => i.room?.id === roomId));
  }, [house, roomId]);
  const slotOptions = useMemo(() => slots ?? [], [slots]);
  const [slotId, setSlotId] = useState<number | undefined>();
  useEffect(() => setSlotId(undefined), [roomId]);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const daysLength = useMemo(() => {
    if (!startDate || !endDate) {
      return undefined;
    }
    return differenceInDays(endDate, startDate);
  }, [startDate, endDate]);

  const monthsLength = useMemo(() => {
    if (!startDate || !endDate) {
      return undefined;
    }
    return differenceInMonths(endDate, startDate);
  }, [startDate, endDate]);

  const [monthlyPrice, setMonthlyPrice] = useState('');

  const navigate = useNavigate();
  const [submitAccommodationPending, setSubmitAccommodationPending] = useState(false);
  const submitAccommodation = useCallback(() => {
    if (!residentId) {
      throw new Error('no resident id');
    }
    if (!slotId) {
      throw new Error('no slot id');
    }
    if (!startDate) {
      throw new Error('no start date');
    }
    if (!endDate) {
      throw new Error('no end date');
    }
    const lengthInDays = differenceInDays(endDate, startDate);
    if (lengthInDays <= 0) {
      throw new Error(`invalid length ${lengthInDays} days`);
    }

    const intMonthlyPrice = parseInt(monthlyPrice, 10);
    if (Number.isNaN(intMonthlyPrice)) {
      throw new Error(`invalid monthly price ${monthlyPrice} parsed as NaN`);
    }

    let cancelled = false;

    const createAccommodation: CreateAccommodation = {
      residentId: residentId.id,
      slotId,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      monthlyPrice: intMonthlyPrice,
    };
    setSubmitAccommodationPending(true);
    accommodationsRepo.create(createAccommodation)
      .then(() => {
        if (!cancelled) {
          navigate('/accommodations');
        }
      })
      .finally(() => { if (!cancelled) { setSubmitAccommodationPending(false); } });
    return () => { cancelled = true; };
  }, [residentId, slotId, startDate, endDate, accommodationsRepo, navigate, monthlyPrice]);

  const isSubmitAvailable = useMemo(
    () => !!residentId && !!house && !!roomId && !!slotId && (daysLength ?? 0) > 0,
    [residentId, house, roomId, slotId, daysLength],
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">Resident</Typography>
              <Paper sx={{ padding: 2 }}>
                <ResidentSelect
                  residents={residents}
                  residentsPending={residentsPending}
                  onChange={setResidentId}
                />
              </Paper>
            </Grid>

            <Grid item>
              <Typography variant="h5">Slot</Typography>
              <Paper sx={{ padding: 2 }}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Button onClick={() => setIsHouseModalOpen(true)}>Select house</Button>
                    { house && `Selected ${house.name}`}
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      { roomsPending && <CircularProgress />}
                      <InputLabel id="demo-simple-select-label">Room</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Room"
                        variant="standard"
                        disabled={roomsPending}
                        onChange={(e) => setRoomId(Number(e.target.value))}
                        value={roomId ?? ''}
                      >
                        {
                      roomOptions.map((room) => (
                        <MenuItem value={room.id!} key={room.id}>
                          #
                          {room.id}
                          {' '}
                          {room.name}
                        </MenuItem>
                      ))
                    }
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      { slotsPending && <CircularProgress />}
                      <InputLabel id="demo-simple-select-label">Slot</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Slot"
                        variant="standard"
                        disabled={slotsPending}
                        onChange={(e) => setSlotId(Number(e.target.value))}
                        value={slotId ?? ''}
                      >
                        {
                      slotOptions.map((slot) => (
                        <MenuItem value={slot.id!} key={slot.id}>
                          #
                          {slot.id}
                          {' '}
                          {slot.label}
                        </MenuItem>
                      ))
                    }
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item>
              <Typography variant="h5">Dates</Typography>
              <Paper sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                  <Grid item lg={6} sm={12}>
                    <DatePicker
                      value={startDate}
                      onChange={setStartDate}
                    />
                  </Grid>
                  <Grid item lg={6} sm={12}>
                    <DatePicker
                      value={endDate}
                      onChange={setEndDate}
                    />
                  </Grid>
                  <Grid item lg={12}>
                    { daysLength !== undefined && (
                    <Typography variant="body1">
                      Days:
                      {' '}
                      {daysLength}
                    </Typography>
                    ) }
                  </Grid>
                  <Grid item lg={12}>
                    { monthsLength !== undefined && (
                    <Typography variant="body1">
                      Months:
                      {' '}
                      {monthsLength}
                    </Typography>
                    ) }
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} md={12}>
          <Typography variant="h5">Price</Typography>
          <Paper>
            <Grid container direction="column" spacing={2}>
              <Grid item lg={12}>
                <TextField
                  label="Monthly price"
                  value={monthlyPrice}
                  onChange={(e) => setMonthlyPrice(e.target.value)}
                />
              </Grid>
              <Grid item lg={12}>
                <ProgressButton
                  onClick={submitAccommodation}
                  variant="contained"
                  disabled={!isSubmitAvailable}
                  pending={submitAccommodationPending}
                >
                  Submit
                </ProgressButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <SmartChooseHouseDialog
        onApply={(v) => (v ? setHouse(v.house) : setHouse(undefined))}
        value={house ? { all: false, house } : undefined}
        open={isHouseModalOpen}
        onClose={() => setIsHouseModalOpen(false)}
      />
    </>

  );
}

export default NewAccommodation;
