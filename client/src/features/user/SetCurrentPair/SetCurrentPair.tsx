import type { ShortUser } from '@/shared/api/interfaces';
import { PairsList } from '@/entities/user/components';
import { setCurrentPair } from '@/entities/user/model';
import { useAppDispatch } from '@/shared/lib/hooks';

export const SetCurrentPair = () => {
  const dispatch = useAppDispatch();

  const handleSetCurrentPair = (user: ShortUser) => {
    dispatch(setCurrentPair(user));
  };

  return <PairsList setCurrentPair={handleSetCurrentPair} />;
};
