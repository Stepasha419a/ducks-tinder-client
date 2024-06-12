import { PairsList } from '@/entities/user/components';
import {
  getUserPairsThunk,
  type PairFilterForm,
} from '@/entities/user/model/pair';
import type { ShortUser } from '@/shared/api/interfaces';
import { useAppDispatch } from '@/shared/lib/hooks';
import {
  FilterPairsItems,
  PairsFilterPopup,
  RatePairPopup,
} from '@/features/user/components';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

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

  const [currentPair, setCurrentPair] = useState<ShortUser | null>(null);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const { control, handleSubmit, reset } = useForm<PairFilterForm>({
    defaultValues: pairFilterFormDefaultValues,
  });

  const prevFilter = useRef<PairFilterForm>(pairFilterFormDefaultValues);

  const submitHandler = handleSubmit((data) => {
    if (JSON.stringify(data) !== JSON.stringify(prevFilter.current)) {
      dispatch(getUserPairsThunk({ isInitial: true, filter: data }));
      prevFilter.current = data;
    }
  });

  const handleReset = () => {
    reset(pairFilterFormDefaultValues);
  };

  return (
    <>
      <FilterPairsItems
        isFilterPopupOpen={isFilterPopupOpen}
        setIsFilterPopupOpen={setIsFilterPopupOpen}
        control={control}
        handleSubmit={submitHandler}
      />
      <PairsList setCurrentPair={setCurrentPair} />
      {currentPair && (
        <RatePairPopup
          setCurrentPair={setCurrentPair}
          currentPair={currentPair}
        />
      )}
      {isFilterPopupOpen && (
        <PairsFilterPopup
          control={control}
          handleReset={handleReset}
          handleSubmit={submitHandler}
          setIsFilterPopupOpen={setIsFilterPopupOpen}
        />
      )}
    </>
  );
};
