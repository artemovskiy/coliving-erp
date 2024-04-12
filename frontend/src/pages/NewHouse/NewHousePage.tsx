import {
  Container, Grid, Paper, Typography,
} from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicHouseForm, emptyFormData } from '../../components/houses/BasicHouseForm';
import { useServerData } from '../../providers/ServerData';
import { housesContext } from '../../components/logic/HousesProvider';

function NewHousePage() {
  const { houses } = useServerData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(emptyFormData());

  const [createPending, setCreatePending] = useState(false);
  const { isFetched, notifyCreation } = useContext(housesContext);

  const createHouse = useCallback(() => {
    setCreatePending(true);
    houses.create({ name: formData.name })
      .then((created) => {
        if (isFetched) {
          notifyCreation(created);
        }
        navigate('/houses');
      })
      .finally(() => {
        setCreatePending(false);
      });
  }, [formData, houses, navigate, isFetched, notifyCreation]);

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
