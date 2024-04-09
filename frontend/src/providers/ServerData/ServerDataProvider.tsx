import React, { useEffect, useMemo } from 'react';
import axios from 'axios';

import {
  AccommodationControllerApi, ChessPlateControllerApi, HousesApi, ResidentControllerApi, RoomsApi, SlotsApi,
} from 'coliving-erp-api-client';
import { ServerDataContext, serverDataContext } from './context';
import { HousesRepository } from './houses-repository';
import { AccommodationsRepository } from './accommodations-repository';
import { ResidentsRepository } from './residents-repository';
import { SlotsRepository } from './slots-repository';
import { RoomsRepository } from './rooms-repository';

export interface ServerDataProviderProps {
  accessToken: string;
  children: React.ReactNode
}

function ServerDataProvider({ accessToken, children }: ServerDataProviderProps) {
  const httpClient = useMemo(() => {
    return axios.create({
    });
  }, []);

  useEffect(() => {
    httpClient.interceptors.request.use((req) => {
      return {
        ...req,
        headers: {
          ...req.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    });
  }, [accessToken, httpClient]);

  const data: ServerDataContext = useMemo(() => {
    const housesApi = new HousesApi(undefined, '/api', httpClient);
    const accommodationsApi = new AccommodationControllerApi(undefined, '/api', httpClient);
    const slotsApi = new SlotsApi(undefined, '/api', httpClient);
    const residentsApi = new ResidentControllerApi(undefined, '/api', httpClient);
    const roomsApi = new RoomsApi(undefined, '/api', httpClient);
    const chessPlateControllerApi = new ChessPlateControllerApi(undefined, '/api', httpClient);

    return {
      houses: new HousesRepository(housesApi),
      accommodations: new AccommodationsRepository(accommodationsApi, chessPlateControllerApi),
      slots: new SlotsRepository(slotsApi),
      rooms: new RoomsRepository(roomsApi),
      residents: new ResidentsRepository(residentsApi),
    };
  }, [httpClient]);

  return (
    <serverDataContext.Provider value={data}>
      {children}
    </serverDataContext.Provider>
  );
}

export default ServerDataProvider;
