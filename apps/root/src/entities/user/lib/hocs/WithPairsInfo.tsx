import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';

import { getPairsInfoThunk } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/lib';

export function WithPairsInfo<P extends object>(
  Component: ComponentType<P>
): FC<P> {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    const pairsInfo = useAppSelector((state) => state.pair.pairsInfo);

    useEffect(() => {
      if (!pairsInfo) {
        dispatch(getPairsInfoThunk());
      }
    }, [dispatch, pairsInfo]);

    return <Component {...props} />;
  };

  return Wrapper;
}
