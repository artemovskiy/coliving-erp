import { Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { AppLayout } from '../../layout/AppLayout';
import { NoLoginLayout } from '../../layout/NoLoginLayout';

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

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout onLogoutClick={() => auth.removeUser()}><Outlet /></AppLayout>
  );
}

export default AuthenticatedWorkspace;
