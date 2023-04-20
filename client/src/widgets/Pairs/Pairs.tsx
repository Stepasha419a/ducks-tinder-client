import type { FC } from 'react';
import type { PairSorts, User } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@hooks';
import { PairsList } from '@entities/user/components';
import { setCurrentPair } from '@entities/user/model';
import { RatePairPopup } from '@features/user';

interface PairsProps {
  sorts: PairSorts;
}

export const Pairs: FC<PairsProps> = ({ sorts }) => {
  const dispatch = useAppDispatch();

  const currentPair = useAppSelector((state) => state.user.currentPair);

  const handleSetCurrentPair = (user: User) => {
    dispatch(setCurrentPair(user));
  };

  return (
    <>
      <PairsList setCurrentPair={handleSetCurrentPair} sorts={sorts} />
      {currentPair && <RatePairPopup />}
    </>
  );
};