import {
  Interval, differenceInCalendarDays, differenceInDays, max, min,
} from 'date-fns';
import {
  Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Toolbar, Tooltip, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import React from 'react';
import { AccommodationData, AccommodationsSheet } from './types';

interface AccommodationCell {
  length: number;
  isEmpty: boolean;
  label: string;
  id?: string;
}

// eslint-disable-next-line max-len
const prepareAccommodationCells = (start: Date, end: Date, accommodations: AccommodationData[]): AccommodationCell[] => {
  const cells: AccommodationCell[] = [];
  let lastAccommodationEnd: Date | undefined;
  let emptyCounter = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const accommodation of accommodations) {
    if (accommodation.startDate > end) {
      break;
    }
    const offset = differenceInDays(accommodation.startDate, start);
    if (offset > 0) {
      if (lastAccommodationEnd) {
        const length = differenceInCalendarDays(accommodation.startDate, lastAccommodationEnd);
        cells.push({
          length,
          isEmpty: true,
          label: `empty${emptyCounter}`,
        });
      } else {
        cells.push({
          length: differenceInCalendarDays(accommodation.startDate, start),
          isEmpty: true,
          label: `empty${emptyCounter}`,
        });
      }
      emptyCounter += 1;
    }

    cells.push({
      length: differenceInCalendarDays(min([accommodation.endDate, end]), max([start, accommodation.startDate])) + 1,
      isEmpty: false,
      label: accommodation.label,
      id: accommodation.id.toString(10),
    });
    lastAccommodationEnd = accommodation.endDate;
  }

  if (!lastAccommodationEnd || lastAccommodationEnd < end) {
    cells.push({
      length: differenceInDays(end, lastAccommodationEnd ?? start) + 1,
      isEmpty: true,
      label: 'empty',
    });
  }

  return cells;
};

function AccommodationsTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Accommodations
      </Typography>
      <Tooltip title="Add accommodation">
        <IconButton component={Link} to="new">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

function AccommodationsMonthTable({ data, interval }: { data: AccommodationsSheet, interval: Interval }) {
  return (
    <Paper>
      <AccommodationsTableToolbar />
      <TableContainer sx={{ width: 1700 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={2} sx={{ borderRight: 1 }}>room</TableCell>
              <TableCell rowSpan={2} sx={{ borderRight: 1 }}>slot</TableCell>
              {
                data.months.map((i) => (
                  <TableCell
                    sx={{ borderRight: 1 }}
                    key={i.isoFirstDay}
                    colSpan={i.length}
                  >
                    {i.name}
                  </TableCell>
                ))
              }
            </TableRow>
            <TableRow>
              {
                data.dates.map((i) => (
                  <TableCell
                    sx={{ borderRight: 1, padding: '1px' }}
                    key={i.toISOString()}
                  >
                    {i.toLocaleString('default', { day: '2-digit' })}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.rooms.map((room) => (
                <React.Fragment key={room.id}>
                  {
                    room.slots.map((slot, index) => {
                      const accommodationCells = prepareAccommodationCells(
                        interval.start as Date,
                        interval.end as Date,
                        slot.accommodations,
                      );
                      return (
                        <TableRow key={slot.name}>
                          { index === 0 && <TableCell rowSpan={room.slots.length}>{room.name}</TableCell>}
                          <TableCell scope="row" sx={{ borderRight: 1 }}>{slot.name}</TableCell>
                          {
                          accommodationCells.map((i) => {
                            if (i.isEmpty) {
                              return <TableCell key={i.label} colSpan={i.length} />;
                            }
                            return (
                              <TableCell key={i.label} colSpan={i.length} sx={{ padding: 0 }}>
                                <Box sx={{ bgcolor: 'primary.main', width: '100%' }}>
                                  <Link to={`preview/${i.id}`}>{i.label}</Link>
                                </Box>
                              </TableCell>
                            );
                          })
                        }
                        </TableRow>
                      );
                    })
                  }
                </React.Fragment>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AccommodationsMonthTable;
