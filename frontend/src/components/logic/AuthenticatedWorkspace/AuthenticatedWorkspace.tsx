import { Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { AppLayout } from '../../layout/AppLayout';
import { NoLoginLayout } from '../../layout/NoLoginLayout';
import { FullScreenPending } from '../../common/FullScreenPending';
import { ServerDataProvider } from '../../../providers/ServerData';
import { HousesProvider } from '../HousesProvider';

function AuthenticatedWorkspace() {
  const auth = useAuth();
  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>;
    case 'signoutRedirect':
      return <div>Signing you out...</div>;
    default:
      break;
  }

  if (auth.isLoading) {
    return <FullScreenPending />;
  }

  if (auth.error) {
    return (
      <div>
        Oops...
        {auth.error?.message}
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <NoLoginLayout onLoginClick={auth.signinRedirect} loginPending={auth.isLoading} />;
  }

  return (
    <ServerDataProvider accessToken={auth.user?.access_token as string}>
      <HousesProvider>
        <AppLayout onLogoutClick={() => auth.removeUser()}><Outlet /></AppLayout>
      </HousesProvider>
    </ServerDataProvider>
  );
}

export default AuthenticatedWorkspace;
