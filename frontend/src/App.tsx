import React from 'react';
import './App.css';

import { CssBaseline } from '@mui/material';
import { ApiClientProvider } from './providers/ApiClient';
import { AppConfigurationProvider } from './providers/AppConfiguration';
import { ConfiguredApp } from './components/logic/ConfiguredApp';

function App() {
  return (
    <ApiClientProvider>
      <AppConfigurationProvider>
        <CssBaseline />
        <ConfiguredApp />
      </AppConfigurationProvider>
    </ApiClientProvider>
  );
}

export default App;
