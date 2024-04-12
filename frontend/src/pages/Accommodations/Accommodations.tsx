// @ts-nocheck
import React, {
  useContext, useEffect, useMemo, useState, useCallback,
} from 'react';

import {
  Box, Button, IconButton, Tooltip,
  Typography,
} from '@mui/material';
import {
  differenceInDays, endOfMonth,
} from 'date-fns';
import { Outlet, Link, useSearchParams } from 'react-router-dom';
import HouseIcon from '@mui/icons-material/House';
import { RoomWithSlots } from './types';
import AccommodationsMonthTable from './AccommmodationsMonthTable';
import { useDataFetch } from '../../api/useApiFetch';
import { useServerData } from '../../providers/ServerData';
import { DisplayIntervalPicker } from '../../components/common/DisplayIntervalPicker';
import { SmartChooseHouseDialog, SmartChooseHouseValue } from '../../components/common/smart/SmartChooseHouseDialog';
import { housesContext, useFirst, useFind } from '../../components/logic/HousesProvider';

function Accommodations() {
  const start = new Date(2024, 1, 1);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 2);
  end.setDate((end.getDate() - 1));

  const [interval, setInterval] = useState<Interval>({ start, end });

  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const findHouse = useFind();
  const firstHouse = useFirst();
  // selects the first house when houses fetched
  useEffect(() => {
    if (firstHouse) {
      if (!searchParams.get('houseId')) {
        setSearchParams((prev) => ({
          ...prev,
          houseId: firstHouse.id,
        }));
      }
    }
  }, [firstHouse, searchParams, setSearchParams]);
  const house: SmartChooseHouseValue = useMemo(() => {
    const houseIdParam = parseInt(searchParams.get('houseId') ?? '', 10);
    if (houseIdParam === undefined) {
      return { all: true };
    }
    const houseEl = findHouse(houseIdParam);
    if (!houseEl) return { all: true };
    return { all: false, house: houseEl };
  }, [searchParams, findHouse]);

  const subTitle = useMemo(() => {
    if (house.all) { return ''; }
    return house.house?.name;
  }, [house]);

  const setHouse = useCallback((value: SmartChooseHouseValue) => {
    if (value.all === true) {
      setSearchParams((prev) => ({
        ...prev,
        houseId: undefined,
      }));
    } else {
      setSearchParams((prev) => ({
        ...prev,
        houseId: value.house?.id,
      }));
    }
  }, [setSearchParams]);

  const { fetchIfNeed: fetchHouses } = useContext(housesContext);
  useEffect(() => fetchHouses(), [fetchHouses]);

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

    const months = chessPlateDate.headers?.map((h) => h.months).flat()
      .map((i) => {
        const firstDate = new Date(i?.firstDay);
        const month = firstDate.toLocaleString('default', { month: 'long' });
        const endOf = endOfMonth(firstDate);
        const length = differenceInDays(endOf, firstDate) + 1;

        const houseUtilization = i.utilization.find((u) => u.houseId === house.house?.id)?.value;
        return {
          name: month,
          isoFirstDay: firstDate.toISOString(),
          length,
          utilization: houseUtilization,
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
        <Box>
          { /* eslint-disable-next-line react/jsx-one-expression-per-line */ }
          <Typography variant="h2">Accommodations <small>{subTitle}</small></Typography>
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
