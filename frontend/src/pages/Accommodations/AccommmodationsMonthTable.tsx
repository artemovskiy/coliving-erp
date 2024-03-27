import {
  Interval, differenceInCalendarDays, differenceInDays,
} from 'date-fns';
import {
  Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Toolbar, Tooltip, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { AccommodationData, AccommodationsSheet } from './types';

interface AccommodationCell {
  length: number;
  isEmpty: boolean;
  label: string;
}

// eslint-disable-next-line max-len
const prepareAccommodationCells = (start: Date, end: Date, accommodations: AccommodationData[]): AccommodationCell[] => {
  const cells: AccommodationCell[] = [];
  let lastAccommodationEnd: Date | undefined;
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
          label: 'empty',
        });
      } else {
        cells.push({
          length: differenceInCalendarDays(accommodation.startDate, start),
          isEmpty: true,
          label: 'empty',
        });
      }
    }

    cells.push({
      length: differenceInCalendarDays(accommodation.endDate, accommodation.startDate),
      isEmpty: false,
      label: accommodation.label,
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
  console.log(data.months);
  return (
    <Paper>
      <AccommodationsTableToolbar />
      <TableContainer sx={{ width: 1700 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
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
                    sx={{ borderRight: 1 }}
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
              data.slots.map((slot) => {
                const accommodationCells = prepareAccommodationCells(
                  interval.start as Date,
                  interval.end as Date,
                  slot.accommodations,
                );
                return (
                  <TableRow key={slot.name}>
                    <TableCell scope="row" sx={{ borderRight: 1 }}>{slot.name}</TableCell>
                    {
                    accommodationCells.map((i) => {
                      if (i.isEmpty) {
                        return <TableCell key={i.label} colSpan={i.length} aria-labelledby="empty" />;
                      }
                      return (
                        <TableCell key={i.label} colSpan={i.length}>
                          <Box sx={{ bgcolor: 'primary.main', width: '100%' }}>
                            <Link to={`preview/${i.label}`}>{i.label}</Link>
                          </Box>
                        </TableCell>
                      );
                    })
                  }
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default AccommodationsMonthTable;
