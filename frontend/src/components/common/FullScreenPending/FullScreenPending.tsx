import { CircularProgress, Grid, Typography } from '@mui/material';

function FullScreenPending() {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '100vh' }} spacing={4}>
      <Grid item>
        <CircularProgress size="6rem" />
      </Grid>
      <Grid item>
        <Typography variant="h2">loading</Typography>
      </Grid>
    </Grid>
  );
}

export default FullScreenPending;
