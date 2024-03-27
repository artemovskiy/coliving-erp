import React from 'react';
import './App.css';

import { RouterProvider } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ru } from 'date-fns/locale/ru';
import { ApiClientProvider } from './providers/ApiClient';
import router from './router';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <ApiClientProvider>
          <RouterProvider router={router} />
        </ApiClientProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
