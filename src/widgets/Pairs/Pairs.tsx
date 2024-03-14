import { PairsList } from '@/entities/user/components';
import type { ShortUser } from '@/shared/api/interfaces';
import { RatePairPopup } from '@features/user';
import { useState } from 'react';

export const Pairs = () => {
  const [currentPair, setCurrentPair] = useState<ShortUser | null>(null);

  return (
    <>
      <PairsList setCurrentPair={setCurrentPair} />
      {currentPair && (
        <RatePairPopup
          setCurrentPair={setCurrentPair}
          currentPair={currentPair}
        />
      )}
    </>
  );
};
