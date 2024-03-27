import { Box, Button, Container, Grid, IconButton, Paper, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import { useApi } from '../../providers/ApiClient';
import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ResidentBasicForm, useEmptyData } from '../../components/resident/ResidentBasicForm';

function NewResident() {
  const { residentsApi } = useApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(useEmptyData());

  const [createPending, setCreatePending] = useState(false);

  const createResident = useCallback(() => {
    let cancelled = false;
    setCreatePending(true);
    residentsApi.createResident({
      firstName: formData.firstName,
      birthday: formData.birthDate.toISOString(),
    })
      .then(({data}) => {
        if(!cancelled) {
          navigate('/residents');
        }
      })
      .finally(() => {
        if(!cancelled) { setCreatePending(false); }
      })

    return () => { cancelled = true };
  }, [ formData, residentsApi, navigate ]);

  return <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h3'>
            New resident
          </Typography>
        </Grid>
        <Grid item lg={6}>
          <Paper sx={{ padding: 2 }}>
            <ResidentBasicForm
              data={formData}
              onChange={setFormData}
              onCreate={createResident}
              createPending={createPending}
            />
          </Paper>
        </Grid>
      </Grid>
  </Container>
}

export default NewResident;