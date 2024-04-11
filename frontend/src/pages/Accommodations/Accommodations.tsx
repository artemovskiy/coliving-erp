// @ts-nocheck
import React, { useMemo, useState } from 'react';

import {
  Box, Button, IconButton, Tooltip,
} from '@mui/material';
import {
  differenceInDays, endOfMonth,
} from 'date-fns';
import { Outlet, Link } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';
import { RoomWithSlots } from './types';
import AccommodationsMonthTable from './AccommmodationsMonthTable';
import { useDataFetch } from '../../api/useApiFetch';
import { useServerData } from '../../providers/ServerData';
import { DisplayIntervalPicker } from '../../components/common/DisplayIntervalPicker';
import { SmartChooseHouseDialog, SmartChooseHouseValue } from '../../components/common/smart/SmartChooseHouseDialog';

function Accommodations() {
  const start = new Date(2024, 1, 1);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 2);
  end.setDate((end.getDate() - 1));

  const [interval, setInterval] = useState<Interval>({ start, end });

  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const [house, setHouse] = useState<SmartChooseHouseValue>();

  const { accommodations: accommodationsRepo } = useServerData();
  const [chessPlateDate] = useDataFetch(() => {
    if (!house) {
      return Promise.resolve(undefined);
    }
    return accommodationsRepo.getChessPlate({
      ...interval, houseId: house.house?.id,
    });
  }, [interval, house]);

  const accommodationsSheet = useMemo(() => {
    if (!chessPlateDate) {
      return undefined;
    }

    const months = chessPlateDate.headers?.map((h) => h.months?.map((m) => m.firstDay)).flat()
      .map((i) => new Date(i))
      .map((i) => {
        const month = i.toLocaleString('default', { month: 'long' });
        const endOf = endOfMonth(i);
        const length = differenceInDays(endOf, i) + 1;
        return {
          name: month,
          isoFirstDay: i.toISOString(),
          length,
        };
      });
    const dates = chessPlateDate.headers?.map((h) => h.months?.map((m) => m.days).flat()).flat()
      .map((i) => new Date(i));
    const houseData = chessPlateDate.houses![0];
    // @ts-ignore
    const data: RoomWithSlots[] = houseData.rooms.map((room) => {
      const roomSlots = room.slots.map((slot) => ({
        id: slot.id!,
        name: slot.label!,
        accommodations: slot.accommodations.map((j) => ({
          label: `${j.id} ${j.resident?.firstName}`,
          startDate: new Date(j.start ?? ''),
          endDate: new Date(j.endDate ?? ''),
          id: j.id,
        })),
      }));
      return {
        id: room.id!,
        name: room.name!,
        slots: roomSlots,
      };
    });

    return {
      months,
      dates,
      rooms: data,
    };
  }, [interval, chessPlateDate]);

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="choose house">
            <IconButton onClick={() => setIsHouseModalOpen(true)} aria-label="choose house">
              <HouseIcon />
            </IconButton>
          </Tooltip>
          <DisplayIntervalPicker value={interval} onChange={setInterval} />
          <Button component={Link} to="new">Create</Button>
        </Box>

        { !!accommodationsSheet && (
        <AccommodationsMonthTable
          data={accommodationsSheet}
          interval={interval}
        />
        )}
      </Box>
      <SmartChooseHouseDialog
        onApply={setHouse}
        value={house}
        open={isHouseModalOpen}
        onClose={() => setIsHouseModalOpen(false)}
      />
      <Outlet />
    </>

  );
}

export default Accommodations;
