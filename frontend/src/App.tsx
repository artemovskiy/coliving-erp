import React from 'react';
import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { AccommodationsPage } from './pages/Accommodations';
import { AppLayout } from './components/layout/AppLayout';
import { CssBaseline } from '@mui/material';
import { ApiClientProvider } from './providers/ApiClient';
import Residents from './pages/Residents/Residents';
import { NewResident } from './pages/NewResident';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ru } from 'date-fns/locale/ru';
import { NewAccommodationPage } from './pages/NewAccommodation';
import HousesPage from './pages/HousesPage';
import { NewHousePage } from './pages/NewHouse';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout>
      <Outlet/>
    </AppLayout>,
    children: [
      {
        path: "/",
        element: <div>Hello world!</div>,
      },
      {
        path: "/aboba",
        element: <div>Hello aboba!</div>,
      },
      {
        path: "/accommodations",
        Component: AccommodationsPage,
      },
      {
        path: "/accommodations/new",
        Component: NewAccommodationPage,
      },
      {
        path: "/residents",
        Component: Residents,
        children: [
        ]
      },
      {
        path: '/residents/new',
        Component: NewResident
      },
      {
        path: '/houses',
        Component: HousesPage
      },
      {
        path: '/houses/new',
        Component: NewHousePage,
      },
    ]
  }
]);

function App() {
  return (
    <div className="App">
      <CssBaseline /> 
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
      <ApiClientProvider>
        <RouterProvider router={router}/>
      </ApiClientProvider>    
      </LocalizationProvider>
    </div>
  );
}

export default App;
