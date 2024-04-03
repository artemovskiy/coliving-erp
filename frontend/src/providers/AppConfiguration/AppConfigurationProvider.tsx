import React, { useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { useApiFetch } from '../../api/useApiFetch';
import { AppConfiguration } from './types';
import { AppConfigurationContext, appConfigurationContext } from './context';
import { useApi } from '../ApiClient';

export interface AppConfigurationProviderProps {
  children: React.ReactNode
}

export default function AppConfigurationProvider({ children }: AppConfigurationProviderProps) {
  const { configApi } = useApi();
  const [configuration, pending, fetchError] = useApiFetch<AppConfiguration>(() => {
    return configApi.get() as Promise<AxiosResponse<AppConfiguration>>;
  }, [configApi]);

  const contextValue: AppConfigurationContext = useMemo(() => {
    return { configuration, pending, error: fetchError };
  }, [configuration, pending, fetchError]);

  return (
    <appConfigurationContext.Provider value={contextValue}>
      {children}
    </appConfigurationContext.Provider>
  );
}
