// @ts-nocheck
import React, {
  useEffect, useMemo, useState,
} from 'react';

import {
  Box, Button, FormControl, Grid, MenuItem, Select,
} from '@mui/material';
import {
  differenceInDays, endOfMonth,
} from 'date-fns';
import { Outlet, Link } from 'react-router-dom';
import { RoomWithSlots } from './types';
import AccommodationsMonthTable from './AccommmodationsMonthTable';
import { useDataFetch } from '../../api/useApiFetch';
import { useServerData } from '../../providers/ServerData';
import { DisplayIntervalPicker } from '../../components/common/DisplayIntervalPicker';

function Accommodations() {
  const start = new Date(2024, 1, 1);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 2);
  end.setDate((end.getDate() - 1));

  const [interval, setInterval] = useState<Interval>({ start, end });

  const { houses: houseRepo, accommodations: accommodationsRepo } = useServerData();
  const [houses] = useDataFetch(() => houseRepo.list(), []);
  const [currentHouseId, setCurrentHouseId] = useState<number | undefined>();
  useEffect(() => { if (houses && houses.length > 0) setCurrentHouseId(houses[0].id); }, [houses]);
  const curHidSafe = useMemo(() => {
    if (!houses || houses.length === 0) { return undefined; }
    return currentHouseId ?? houses[0].id;
  }, [houses, currentHouseId]);

  const [chessPlateDate] = useDataFetch(() => accommodationsRepo.getChessPlate({
    ...interval, houseId: currentHouseId,
  }), [interval, currentHouseId]);

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
    const house = chessPlateDate.houses![0];
    // @ts-ignore
    const data: RoomWithSlots[] = house.rooms.map((room) => {
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
        <Grid container alignItems="center">
          <Grid item>
            { houses
      && (
        <FormControl>
          <Select value={curHidSafe} onChange={(e) => setCurrentHouseId(e.target.value)}>
            { houses.map((house) => <MenuItem key={house.id} value={house.id}>{`${house.id} ${house.name}`}</MenuItem>)}
          </Select>
        </FormControl>
      )}
          </Grid>
          <Grid item>
            <DisplayIntervalPicker value={interval} onChange={setInterval} />
          </Grid>
          <Grid item>
            <Button component={Link} to="new">Create</Button>
          </Grid>
        </Grid>

        { !!accommodationsSheet && (
        <AccommodationsMonthTable
          data={accommodationsSheet}
          interval={interval}
        />
        )}
      </Box>
      <Outlet />
    </>

  );
}

export default Accommodations;
