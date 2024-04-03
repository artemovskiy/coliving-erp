import { createContext, useContext } from 'react';
import { AppConfiguration } from './types';

export interface AppConfigurationContext {
  configuration?: AppConfiguration
  pending: boolean;
  error?: Error;
}

export const defaultContext = {
  pending: false,
};
export const appConfigurationContext = createContext<AppConfigurationContext>(defaultContext);

export const useAppConfiguration = () => useContext(appConfigurationContext);
