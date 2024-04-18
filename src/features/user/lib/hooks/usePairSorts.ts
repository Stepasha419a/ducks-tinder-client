import { setFilter } from '@/entities/user/model/pair';
import type { PairFilterForm } from '@/entities/user/model/pair/pair.interface';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { useController, useForm } from 'react-hook-form';

const defaultValues: PairFilterForm = {
  distance: 100,
  age: { from: 18, to: 100 },
  pictures: 0,
  interests: [],
  hasInterests: false,
  identifyConfirmed: false,
};

export function usePairSorts() {
  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.pair.filter);

  const { control, handleSubmit, reset } = useForm<PairFilterForm>({
    defaultValues: filter,
  });

  const {
    field: { value: interests, onChange: setInterests },
  } = useController({
    name: 'interests',
    control,
  });

  const {
    field: { value: hasInterests, onChange: setHasInterests },
  } = useController({
    name: 'hasInterests',
    control,
  });

  const {
    field: { value: identifyConfirmed, onChange: setIdentifyConfirmed },
  } = useController({
    name: 'identifyConfirmed',
    control,
  });

  const toggleInterest = (item: string): void => {
    if (interests.some((interest) => interest === item)) {
      setInterests(interests.filter((interest) => interest !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const submitHandler = handleSubmit((data) => {
    dispatch(setFilter(data));
  });

  const forcedToggleInterest = (item: string): void => {
    toggleInterest(item);
    submitHandler();
  };

  const toggleHasInterests = (): void => {
    setHasInterests(!hasInterests);
  };

  const toggleIdentifyConfirmed = (): void => {
    setIdentifyConfirmed(!identifyConfirmed);
  };

  const forcedToggleHasInterests = (): void => {
    setHasInterests(!hasInterests);
    submitHandler();
  };

  const forcedToggleIdentifyConfirmed = (): void => {
    setIdentifyConfirmed(!identifyConfirmed);
    submitHandler();
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return {
    control,
    submitHandler,
    hasInterests,
    identifyConfirmed,
    toggleHasInterests,
    toggleIdentifyConfirmed,
    forcedToggleHasInterests,
    forcedToggleIdentifyConfirmed,
    interests,
    toggleInterest,
    forcedToggleInterest,
    handleReset,
  };
}
