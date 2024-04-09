import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { House } from 'coliving-erp-api-client';
import {
  Grid, LinearProgress, Paper, Typography,
} from '@mui/material';
import { useDataFetch } from '../../api/useApiFetch';
import { BasicHouseForm, BasicHouseFormData } from '../../components/houses/BasicHouseForm';
import RoomsSection from './RoomsSection';
import { useServerData } from '../../providers/ServerData';

function HousePage() {
  const { id } = useParams();
  const houseId = useMemo(() => {
    if (id === undefined) { throw new Error('null id'); }
    const numId = parseInt(id, 10);
    if (Number.isNaN(numId)) {
      throw new Error('can not parse id');
    }
    return numId;
  }, [id]);

  const { houses } = useServerData();
  const [house, housePending] = useDataFetch<House>(() => {
    if (id === undefined) { throw new Error('null id'); }
    const numId = parseInt(id, 10);
    if (Number.isNaN(numId)) {
      throw new Error('can not parse id');
    }
    return houses.get(numId);
  }, [id]);

  const [formData, setFormData] = useState<BasicHouseFormData>();
  useEffect(() => {
    if (house) setFormData({ name: house.name! });
    else setFormData(undefined);
  }, [house]);

  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <Typography variant="h2">
          House #
          {id}
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Paper sx={{ padding: 2 }}>
          { housePending && <LinearProgress />}
          { formData && (
          <BasicHouseForm
            data={formData}
            onChange={() => {}}
          />
          ) }
        </Paper>
      </Grid>
      <Grid item lg={6}>
        { id !== undefined && <RoomsSection houseId={houseId} />}
      </Grid>
    </Grid>
  );
}

export default HousePage;
