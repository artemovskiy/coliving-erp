import { ReactNode } from 'react';
import { apiClientContext, defaultcontext } from './context';

export interface ApiContextProviderProps {
  children: ReactNode;
}

function ApiContextProvider({ children }: ApiContextProviderProps) {
  return <apiClientContext.Provider value={defaultcontext}>
    { children }
  </apiClientContext.Provider>
}

export default ApiContextProvider;