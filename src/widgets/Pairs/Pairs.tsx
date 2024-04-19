import { PairsList } from '@/entities/user/components';
import {
  getUserPairsThunk,
  type PairFilterForm,
} from '@/entities/user/model/pair';
import type { ShortUser } from '@/shared/api/interfaces';
import { useAppDispatch } from '@/shared/lib/hooks';
import {
  PairsFilterPopup,
  RatePairPopup,
  SortPairsItems,
} from '@features/user';
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
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
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
      <SortPairsItems
        isSortPopupOpen={isSortPopupOpen}
        setIsSortPopupOpen={setIsSortPopupOpen}
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
      {isSortPopupOpen && (
        <PairsFilterPopup
          control={control}
          handleReset={handleReset}
          handleSubmit={submitHandler}
          setIsSortPopupOpen={setIsSortPopupOpen}
        />
      )}
    </>
  );
};
