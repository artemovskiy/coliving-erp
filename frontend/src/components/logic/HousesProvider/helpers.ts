import { House } from 'coliving-erp-api-client';
import { useCallback, useContext } from 'react';
import { housesContext } from './context';

const useFirst = (): House | undefined => {
  const { data } = useContext(housesContext);
  if (!data || data.length === 0) { return undefined; }
  return data[0];
};

const useFind = (): (id: number) => House | undefined => {
  const { data } = useContext(housesContext);
  return useCallback((id: number) => {
    if (!data || data.length === 0) { return undefined; }
    return data.find((i) => i.id === id);
  }, [data]);
};

export { useFirst, useFind };
