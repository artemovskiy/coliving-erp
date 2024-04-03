import React from 'react';
import './App.css';

import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ru } from 'date-fns/locale/ru';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { ApiClientProvider } from './providers/ApiClient';
import router from './router';

const oidcConfig: AuthProviderProps = {
  authority: 'https://auth.artemovskiy.me/realms/coliving-erp',
  client_id: 'coliving-erp-app-local',
  // redirect_uri: 'http://localhost:3000',
  redirect_uri: 'http://localhost:3000/',
  // ...
};

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AuthProvider
        {...oidcConfig}
        onSigninCallback={() => {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname,
          );
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
          <ApiClientProvider>
            <RouterProvider router={router} />
          </ApiClientProvider>
        </LocalizationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
