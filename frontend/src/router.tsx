import React from 'react';
import './App.css';

import {
  createBrowserRouter,
  Outlet,
} from 'react-router-dom';
import { AccommodationsPage } from './pages/Accommodations';
import { AppLayout } from './components/layout/AppLayout';
import Residents from './pages/Residents/Residents';
import { NewResident } from './pages/NewResident';
import { NewAccommodationPage } from './pages/NewAccommodation';
import { HousesPage } from './pages/HousesPage';
import { NewHousePage } from './pages/NewHouse';
import { HousePage } from './pages/HousePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout><Outlet /></AppLayout>,
    children: [
      {
        path: '/',
        element: <div>Hello world!</div>,
      },
      {
        path: '/aboba',
        element: <div>Hello aboba!</div>,
      },
      {
        path: '/accommodations',
        Component: AccommodationsPage,
      },
      {
        path: '/accommodations/new',
        Component: NewAccommodationPage,
      },
      {
        path: '/residents',
        Component: Residents,
        children: [
        ],
      },
      {
        path: '/residents/new',
        Component: NewResident,
      },
      {
        path: '/houses',
        Component: HousesPage,
      },
      {
        path: '/houses/new',
        Component: NewHousePage,
      },
      {
        path: '/houses/:id',
        Component: HousePage,
      },
    ],
  },
]);

export default router;
