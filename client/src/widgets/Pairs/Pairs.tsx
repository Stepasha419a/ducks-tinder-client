import type { FC } from 'react';
import type { ShortUser } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setCurrentPair } from '@entities/user/model';
import { PairsList } from '@entities/user/components';
import { RatePairPopup } from '@features/user';

export const Pairs: FC = () => {
  const dispatch = useAppDispatch();

  const currentPair = useAppSelector((state) => state.user.currentPair);

  const handleSetCurrentPair = (user: ShortUser) => {
    dispatch(setCurrentPair(user));
  };

  return (
    <>
      <PairsList setCurrentPair={handleSetCurrentPair} />
      {currentPair && <RatePairPopup />}
    </>
  );
};
