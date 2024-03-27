import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Resident } from 'coliving-erp-api-client';

export interface ResidentSelectProps {
  residents?: Resident[];
  residentsPending?: boolean;
  onChange?: (value: Resident) => void;
}

function ResidentSelect(props: ResidentSelectProps) {
  const { residents, residentsPending, onChange } = props;

  const handleRowClick = onChange ? onChange : () => {};

  return <Box>
    <Box>
      <TextField
        variant='standard'
        fullWidth
        label='Name'
      />
    </Box>
    <Box>
      { residentsPending && <CircularProgress/>}
      {
        residents
          ? 
            <TableContainer sx={{maxHeight: 240}}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    residents.map(resident => {
                      return <TableRow onClick={() => handleRowClick(resident)} hover key={resident.id!} data-id={resident.id!}>
                        <TableCell>{resident.id}</TableCell>
                        <TableCell>{resident.firstName}</TableCell>
                      </TableRow>
                    })
                  }
                  
                </TableBody>
              </Table>
            </TableContainer>
          : <Typography variant='body1'>No options</Typography>
      }
     
    </Box>
  </Box>
}

export default ResidentSelect;