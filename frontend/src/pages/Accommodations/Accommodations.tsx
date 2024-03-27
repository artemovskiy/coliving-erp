import React, { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import {
  differenceInDays, eachDayOfInterval, eachMonthOfInterval, endOfMonth,
} from 'date-fns';
import { Accommodation } from 'coliving-erp-api-client';
import { ASMonth, RoomWithSlots } from './types';
import AccommodationsMonthTable from './AccommmodationsMonthTable';
import { useApi } from '../../providers/ApiClient';
import { useApiFetch } from '../../api/useApiFetch';

function Accommodations() {
  const start = new Date(2024, 1, 1);
  const [startDate] = useState(start);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 2);
  end.setDate((end.getDate() - 1));
  const [endDate] = useState(end);

  const { accommodationsApi, slotsApi, roomsApi } = useApi();

  const [accommodations, setAccommodations] = useState<Accommodation[] | undefined>();
  useEffect(() => {
    let cancelled = false;
    accommodationsApi.listAccommodations()
      .then(({ data }) => {
        if (!cancelled) {
          setAccommodations(data);
        }
      });

    return () => { cancelled = true; };
  }, [accommodationsApi]);

  const [rooms] = useApiFetch(() => roomsApi.listRooms(), [roomsApi]);
  const [slots] = useApiFetch(() => slotsApi.listSlots(), [slotsApi]);

  const accommodationsSheet = useMemo(() => {
    if (rooms === undefined || slots === undefined || accommodations === undefined) {
      return undefined;
    }

    const interval = {
      start: startDate,
      end: endDate,
    };
    const monthStarts = eachMonthOfInterval(interval);
    const months: ASMonth[] = monthStarts.map((i) => {
      const month = i.toLocaleString('default', { month: 'long' });
      const endOf = endOfMonth(i);
      const length = differenceInDays(endOf, i) + 1;
      return {
        name: month,
        isoFirstDay: i.toISOString(),
        length,
      };
    });

    const dates = eachDayOfInterval(interval);

    const data: RoomWithSlots[] = rooms.map((room) => {
      const roomSlots = slots.filter((i) => i.room?.id === room.id).map((slot) => {
        const slotAccommodations = accommodations.filter((i) => i.slot?.id === slot.id);
        return ({
          id: slot.id!,
          name: slot.label!,
          accommodations: slotAccommodations.map((j) => ({
            label: `${j.id} ${j.resident?.firstName}`,
            startDate: new Date(j.start ?? ''),
            endDate: new Date(j.endDate ?? ''),
          })),
        });
      });
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
      // slots: slotsWithAccommodations.map(({ name, accommodations }) => ({
      //   name,
      //   accommodations: accommodations,
      // })),
    };
  }, [startDate, endDate, slots, accommodations]);

  return (

    <Box>
      { !!accommodationsSheet && (
      <AccommodationsMonthTable
        data={accommodationsSheet}
        interval={{ start: startDate, end: endDate }}
      />
      )}
    </Box>
  );
}

export default Accommodations;
