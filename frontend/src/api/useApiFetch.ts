import { DependencyList, useEffect, useState } from 'react';

export type CancelFn = () => void;

export type ApiFetchHook<TData> = [
  data: TData | undefined,
  pending: boolean,
  error: Error | undefined,
  set: (value: TData) => void,
];

export const useApiFetch = <TData>(
  apiMethod: () => Promise<import('axios').AxiosResponse<TData, any>>,
  params: DependencyList,
): ApiFetchHook<TData> => {
  const [fetchedData, setData] = useState<TData | undefined>();
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  useEffect(() => {
    let cancelled = false;
    setPending(true);
    apiMethod()
      .then(({ data }) => {
        if (!cancelled) {
          setData(data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setPending(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e);
        }
      });

    return () => { cancelled = true; };
  }, params);

  return [fetchedData, pending, error, setData];
};

export const useDataFetch = <TData>(
  apiMethod: () => Promise<TData>,
  params: DependencyList,
): ApiFetchHook<TData> => {
  const [fetchedData, setData] = useState<TData | undefined>();
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  useEffect(() => {
    let cancelled = false;
    setPending(true);
    apiMethod()
      .then((data) => {
        if (!cancelled) {
          setData(data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setPending(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e);
        }
      });

    return () => { cancelled = true; };
  }, params);

  return [fetchedData, pending, error, setData];
};
