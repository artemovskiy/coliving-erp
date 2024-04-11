import React from 'react';
import './App.css';

import { createBrowserRouter } from 'react-router-dom';
import { AccommodationsPage } from './pages/Accommodations';
import Residents from './pages/Residents/Residents';
import { NewResident } from './pages/NewResident';
import { NewAccommodationPage } from './pages/NewAccommodation';
import { HousesPage } from './pages/HousesPage';
import { NewHousePage } from './pages/NewHouse';
import { HousePage } from './pages/HousePage';
import { AccommodationPreviewPage } from './pages/AccommodationPreview';
import { AuthenticatedWorkspace } from './components/logic/AuthenticatedWorkspace';
import { ExpectedEarnReportPage } from './pages/ExpectedEarnReport';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AuthenticatedWorkspace,
    children: [
      {
        path: '/',
        element: <div>Hello world!</div>,
      },
      {
        path: '/accommodations',
        Component: AccommodationsPage,
        children: [
          { path: 'preview/:id', Component: AccommodationPreviewPage },
        ],
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
      {
        path: 'reports/expected-earn',
        Component: ExpectedEarnReportPage,
      },
    ],
  },
]);

export default router;
