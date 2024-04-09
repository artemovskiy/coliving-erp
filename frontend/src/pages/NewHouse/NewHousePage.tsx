import {
  Container, Grid, Paper, Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicHouseForm, emptyFormData } from '../../components/houses/BasicHouseForm';
import { useServerData } from '../../providers/ServerData';

function NewHousePage() {
  const { houses } = useServerData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyFormData());

  const [createPending, setCreatePending] = useState(false);

  const createHouse = useCallback(() => {
    setCreatePending(true);
    houses.create({ name: formData.name })
      .then(() => {
        navigate('/houses');
      })
      .finally(() => {
        setCreatePending(false);
      });
  }, [formData, houses, navigate]);

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
