import { useEffect, useState } from 'react';

export type CancelFn  = () => void;

export type ApiFetchHook<TData> = [
  data: TData | undefined,
  pending: boolean,
  error: Error | undefined,
]

export const useApiFetch = <TData, TParams extends Array<unknown> = []>(
  apiMethod: (...params: TParams) => Promise<import("axios").AxiosResponse<TData, any>>,
  params: TParams,
): ApiFetchHook<TData> => {
  const [data, setData] = useState<TData | undefined>();
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  useEffect(() => {
    let cancelled = false;
    setPending(true);
    apiMethod(...params)
      .then(({data}) => {
        if(!cancelled) {
          setData(data);
        }
      })
      .finally(() => {
        if(!cancelled) {
          setPending(false);
        }
      })
      .catch((e) => {
        if(!cancelled) {
          setError(e);
        }
      })

    return () => { cancelled = true };
  }, params);
    

  return [ data, pending, error ];  
}

