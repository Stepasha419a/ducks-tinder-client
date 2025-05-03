import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@ducks-tinder-client/common';

import { getPairsInfoThunk } from '@entities/user';

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
