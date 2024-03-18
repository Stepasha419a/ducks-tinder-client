import type { PairFilterForm } from '@/entities/user/model/pair';
import { filterPairs } from '@/entities/user/model/pair';
import { useAppDispatch } from '@shared/lib/hooks';
import { useController, useForm } from 'react-hook-form';

const defaultValues: PairFilterForm = {
  distance: 100,
  age: { from: 18, to: 100 },
  photos: 1,
  interests: [],
  account: [],
};

export function usePairSorts() {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, reset } = useForm<PairFilterForm>({
    defaultValues,
  });

  const {
    field: { value: interests, onChange: setInterests },
  } = useController({
    name: 'interests',
    control,
  });

  const {
    field: { value: account, onChange: setAccount },
  } = useController({
    name: 'account',
    control,
  });

  const toggleInterest = (item: string): void => {
    if (interests.some((interest) => interest === item)) {
      setInterests(interests.filter((interest) => interest !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const toggleAccount = (item: string): void => {
    if (account.includes(item)) {
      setAccount(account.filter((setting) => setting !== item));
    } else {
      setAccount([...account, item]);
    }
  };

  const submitHandler = handleSubmit((data) => {
    dispatch(filterPairs(data));
  });

  const forcedToggleInterest = (item: string): void => {
    toggleInterest(item);
    submitHandler();
  };

  const forcedToggleAccount = (item: string): void => {
    toggleAccount(item);
    submitHandler();
  };

  const handleReset = () => {
    reset(defaultValues);
  };

  return {
    control,
    submitHandler,
    account,
    toggleAccount,
    forcedToggleAccount,
    interests,
    toggleInterest,
    forcedToggleInterest,
    handleReset,
  };
}
