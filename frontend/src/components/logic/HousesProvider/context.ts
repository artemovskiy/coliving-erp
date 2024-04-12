import { House } from 'coliving-erp-api-client';
import { createContext } from 'react';

export type CancelFn = () => void;

export interface HousesContext {
  isFetched: boolean;
  fetch: () => CancelFn;
  fetchIfNeed: () => CancelFn;
  data?: House[];
  isPending: boolean;
  notifyCreation: (created: House) => void;
}

const defaultContext: HousesContext = {
  isFetched: false,
  fetch: () => { throw new Error('not implemented'); },
  fetchIfNeed: () => { throw new Error('not implemented'); },
  isPending: false,
  notifyCreation: () => { throw new Error('not implemented'); },
};

export const housesContext = createContext<HousesContext>(defaultContext);
