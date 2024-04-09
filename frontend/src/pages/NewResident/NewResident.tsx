import {
  Container, Grid, Paper, Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResidentBasicForm, useEmptyData } from '../../components/resident/ResidentBasicForm';
import { useServerData } from '../../providers/ServerData';

function NewResident() {
  const { residents } = useServerData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(useEmptyData());

  const [createPending, setCreatePending] = useState(false);

  const createResident = useCallback(() => {
    let cancelled = false;
    setCreatePending(true);
    residents.create({
      firstName: formData.firstName,
      birthday: formData.birthDate.toISOString(),
    })
      .then(() => {
        if (!cancelled) {
          navigate('/residents');
        }
      })
      .finally(() => {
        if (!cancelled) { setCreatePending(false); }
      });

    return () => { cancelled = true; };
  }, [formData, residents, navigate]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3">
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
  );
}

export default NewResident;
