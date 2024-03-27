import { Accommodation, AccommodationControllerApi, HousesApi, ResidentControllerApi, RoomsApi, SlotsApi } from 'coliving-erp-api-client';
import { createContext, useContext } from 'react';

export interface ApiClientContextData {
  accommodationsApi: AccommodationControllerApi;
  slotsApi: SlotsApi,
  housesApi: HousesApi,
  roomsApi: RoomsApi,
  residentsApi: ResidentControllerApi;
}

export const defaultcontext = {
  accommodationsApi: new AccommodationControllerApi(undefined, '/api'),
  slotsApi: new SlotsApi(undefined, '/api'),
  residentsApi: new ResidentControllerApi(undefined, '/api'),
  housesApi: new HousesApi(undefined, '/api'),
  roomsApi: new RoomsApi(undefined, '/api'),
};
export const apiClientContext = createContext<ApiClientContextData>(defaultcontext)

export const useApi = () => useContext(apiClientContext);