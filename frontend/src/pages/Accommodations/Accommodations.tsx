import React, { useEffect, useMemo, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ASMonth, AccommodationsSheet } from './types';
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval, eachMonthOfInterval, endOfMonth } from 'date-fns';
import AccommodationsMonthTable from './AccommmodationsMonthTable';
import { useApi } from '../../providers/ApiClient';
import { Accommodation, Slot } from 'coliving-erp-api-client';

const placeAccommodations = (startDate: Date, endDate: Date, slots: Array<{name: string, accommodations: Accommodation[]}>): AccommodationsSheet => {
  const interval = {
    start: startDate,
    end: endDate,
  };
  const monthStarts = eachMonthOfInterval(interval)
  const months: ASMonth[] = monthStarts.map(i => {
    const month = i.toLocaleString('default', { month: 'long' });
    const endOf = endOfMonth(i);
    const length = differenceInDays(endOf, i) + 1;
    return {
      name: month,
      isoFirstDay: i.toISOString(),
      length,
    }
  })
  
  const dates = eachDayOfInterval(interval);

  return {
    months,
    dates,
    slots: slots.map(({ name, accommodations }) => ({
      name,
      accommodations: accommodations.map(j => ({
        label: `${j.id} ${j.resident?.firstName}`,
        startDate: new Date(j.start ?? ''),
        endDate:new Date(j.endDate ?? ''),
      }))
    })),
  }
}

function Accommodations() {
  const start = new Date(2024, 1, 1);
  const [ startDate, setStartDate] = useState(start);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 2);
  end.setDate((end.getDate() - 1));
  const [ endDate, setEndDate] = useState(end);

  const { accommodationsApi, slotsApi } = useApi();

  const [accommodations, setAccommodations] = useState<Accommodation[] | undefined>();
  useEffect(() => {
    let cancelled = false;
    accommodationsApi.listAccommodations()
      .then(({data}) => {
        if(!cancelled) {
          setAccommodations(data);
        }
      });

    return () => { cancelled = true };
  }, [accommodationsApi]);

  const [slots, setSlots] = useState<Slot[] | undefined>();
  useEffect(() => {
    let cancelled = false;
    slotsApi.listSlots()
      .then(({data}) => {
        if(!cancelled) {
          setSlots(data);
        }
      });

    return () => { cancelled = true };
  }, [slotsApi]);



  const accommodationsSheet = useMemo(() => {
    if(slots === undefined || accommodations === undefined) {
      return undefined;
    }
    const slotsWithAccommodations: Array<{name: string, accommodations: Accommodation[]}> = slots.map(slot => {
      const slotAccommodations = accommodations.filter(i => i.slot?.id === slot.id);
      return {
        name: slot.label ?? 'unknown',
        accommodations: slotAccommodations,
      }
    })
    return placeAccommodations(startDate, endDate, slotsWithAccommodations)
  }, [startDate, endDate, slots, accommodations]);

  return (

<Box>
      { !!accommodationsSheet && <AccommodationsMonthTable data={accommodationsSheet} interval={{ start: startDate, end: endDate}}/>}
    </Box>
  );
}

export default Accommodations;
