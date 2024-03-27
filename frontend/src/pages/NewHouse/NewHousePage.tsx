import {
  Container, Grid, Paper, Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../providers/ApiClient';
import { BasicHouseForm, emptyFormData } from '../../components/houses/BasicHouseForm';

function NewHousePage() {
  const { housesApi } = useApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyFormData());

  const [createPending, setCreatePending] = useState(false);

  const createHouse = useCallback(() => {
    let cancelled = false;
    setCreatePending(true);
    housesApi.createHouse({
      name: formData.name,
    })
      .then(() => {
        if (!cancelled) {
          navigate('/houses');
        }
      })
      .finally(() => {
        if (!cancelled) { setCreatePending(false); }
      });

    return () => { cancelled = true; };
  }, [formData, housesApi, navigate]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3">
            New house
          </Typography>
        </Grid>
        <Grid item lg={6}>
          <Paper sx={{ padding: 2 }}>
            <BasicHouseForm
              data={formData}
              onChange={setFormData}
              createPending={createPending}
              onCreate={createHouse}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NewHousePage;
