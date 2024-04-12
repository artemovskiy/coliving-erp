import React, { useCallback, useMemo, useState } from 'react';
import { House } from 'coliving-erp-api-client';
import { HousesContext, housesContext } from './context';
import { useServerData } from '../../../providers/ServerData';

export interface HousesProviderProps {
  children: React.ReactNode;
}

function HousesProvider({ children }: HousesProviderProps) {
  const { houses } = useServerData();

  const [data, setData] = useState<House[] | undefined>();
  const [pending, setPending] = useState(false);
  const fetch = useCallback(() => {
    let cancelled = false;
    setPending(true);
    houses.list()
      .then((result) => {
        if (!cancelled) {
          setData(result);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setPending(false);
        }
      });
    return () => { cancelled = true; };
  }, [houses]);

  const fetchIfNeed = useCallback(() => {
    if (!data) {
      return fetch();
    }
    return () => {};
  }, [data, fetch]);

  const notifyCreation = useCallback((created: House) => {
    if (data) {
      setData([...data, created]);
    }
  }, [data]);

  const ctxValue: HousesContext = useMemo(() => ({
    fetch,
    isFetched: data !== undefined,
    fetchIfNeed,
    data,
    isPending: pending,
    notifyCreation,
  }), [fetch, fetchIfNeed, data, pending, notifyCreation]);

  return (
    <housesContext.Provider value={ctxValue}>
      { children }
    </housesContext.Provider>
  );
}

export default HousesProvider;
