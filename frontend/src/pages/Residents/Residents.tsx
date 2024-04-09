import {
  Box, IconButton, Paper, Toolbar, Tooltip, Typography,
} from '@mui/material';
import React from 'react';
import { Resident } from 'coliving-erp-api-client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { Link, Outlet } from 'react-router-dom';
import { useServerData } from '../../providers/ServerData';
import { useDataFetch } from '../../api/useApiFetch';

const columns: GridColDef<Resident>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
  },
  {
    field: 'birthday',
    headerName: 'Birthday',
    width: 150,
  },

];

function ResidentsTableToolbar() {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Tooltip title="Add resident">
        <IconButton component={Link} to="new">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}

function Residents() {
  const { residents: residentsRepo } = useServerData();

  const [residents] = useDataFetch(() => residentsRepo.list(), [residentsRepo]);

  return (
    <Box>
      <Typography variant="h3">Residents</Typography>
      <Paper>
        {!!residents
      && (
      <>
        <ResidentsTableToolbar />
        <DataGrid
          rows={residents}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </>
      )}
      </Paper>
      <Outlet />
    </Box>
  );
}

export default Residents;
