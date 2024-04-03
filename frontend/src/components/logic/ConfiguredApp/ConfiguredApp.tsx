import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ru } from 'date-fns/locale/ru';
import { AuthProvider } from 'react-oidc-context';
import router from '../../../router';
import { useAppConfiguration } from '../../../providers/AppConfiguration';
import { FullScreenPending } from '../../common/FullScreenPending';

function ConfiguredApp() {
  const { configuration, pending: configurationPending } = useAppConfiguration();
  if (configurationPending || !configuration) {
    return <FullScreenPending />;
  }
  if (configuration) {
    return (
      <AuthProvider
        authority={configuration.oidc.providerUrl}
        redirect_uri={configuration.baseUrl}
        client_id={configuration.oidc.clientId}
        onSigninCallback={() => {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </AuthProvider>
    );
  }

  return null;
}

export default ConfiguredApp;
