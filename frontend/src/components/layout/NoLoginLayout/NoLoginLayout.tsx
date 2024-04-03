import { Grid, Typography } from '@mui/material';
import { ProgressButton } from '../../common/ProgressButton';

interface NoLoginLayoutProps {
  onLoginClick: () => void
  loginPending?: boolean
}

function NoLoginLayout({ onLoginClick, loginPending }: NoLoginLayoutProps) {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <Grid item>
        <Typography variant="h2">Authorization required</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          Login required to enter the
          {' '}
          <u>workspace</u>
          !
        </Typography>
        <Typography variant="body1"><small>click on the button below</small></Typography>
      </Grid>
      <Grid item>
        <ProgressButton onClick={onLoginClick} pending={loginPending}>Login</ProgressButton>
      </Grid>
    </Grid>
  );
}

NoLoginLayout.deafultProps = {
  loginPending: false,
};

export default NoLoginLayout;
