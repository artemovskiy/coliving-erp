import {
  Button, CircularProgress, Container, Grid, Paper, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HousesTable } from '../../components/houses/HousesTable';
import { useApiFetch } from '../../api/useApiFetch';
import { useApi } from '../../providers/ApiClient';

function HousesPage() {
  const { housesApi } = useApi();
  const [houses, housesPending] = useApiFetch(() => housesApi.listHouses(), []);

  const navigate = useNavigate();
  const handleRowClick = useCallback((houseId: number) => {
    navigate(`${houseId}`);
  }, [navigate]);

  return (
    <Container>
      <Grid container>
        <Grid item lg={6}>
          <Typography variant="h2">
            Houses
          </Typography>
        </Grid>
        <Grid item lg={6} justifySelf="end">
          <Button component={Link} to="new">Add</Button>
        </Grid>
        <Grid item lg={12}>
          <Paper>
            { housesPending && <CircularProgress />}
            { houses && (
            <HousesTable
              data={houses}
              onRowClick={handleRowClick}
            />
            ) }
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HousesPage;
