import { House } from 'coliving-erp-api-client';
import { useContext } from 'react';
import { housesContext } from './context';

const useFirst = (): House | undefined => {
  const { data } = useContext(housesContext);
  if (!data || data.length === 0) { return undefined; }
  return data[0];
};

export { useFirst };
