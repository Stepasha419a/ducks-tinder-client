import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { ShortUser } from '@ducks-tinder-client/common';

import { FilterPairsItems } from '@features/FilterPairsItems';
import { PairsList } from '@features/PairsList';
import type { RatePairPopupProps } from '@features/RatePairPopup';
import { RatePairPopup } from '@features/RatePairPopup';
import { getUserPairsThunk, type PairFilterForm } from '@entities/user';
import { useAppDispatch } from '@shared/lib';
import { useOpenModal } from '@ducks-tinder-client/ui';

export const pairFilterFormDefaultValues: PairFilterForm = {
  distance: 100,
  age: { from: 18, to: 100 },
  pictures: 0,
  interests: [],
  hasInterests: false,
  identifyConfirmed: false,
};

export const Pairs = () => {
  const dispatch = useAppDispatch();

  const { openModal } = useOpenModal();

  const [isFilterPopupOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<PairFilterForm>({
    defaultValues: pairFilterFormDefaultValues,
  });

  const prevFilter = useRef<PairFilterForm>(pairFilterFormDefaultValues);

  // eslint-disable-next-line react-hooks/refs
  const submitHandler = handleSubmit((data) => {
    if (JSON.stringify(data) !== JSON.stringify(prevFilter.current)) {
      dispatch(getUserPairsThunk({ isInitial: true, filter: data }));
      prevFilter.current = data;
    }
  });

  const handleReset = () => {
    reset(pairFilterFormDefaultValues);
  };

  const handleSetPair = (pair: ShortUser | null) => {
    if (!pair) {
      return;
    }

    openModal<RatePairPopupProps>({
      Component: RatePairPopup,
      props: { currentPair: pair },
    });
  };

  return (
    <>
      <FilterPairsItems
        isFilterPopupOpen={isFilterPopupOpen}
        control={control}
        handleSubmit={submitHandler}
        handleReset={handleReset}
      />
      <PairsList onPairClick={handleSetPair} />
    </>
  );
};
