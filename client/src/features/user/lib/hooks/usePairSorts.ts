import type { Interest } from '@shared/api/interfaces';
import type { PairSorts } from '@entities/user/model';
import { INITIAL_SORTS } from '@entities/user/model';
import { setPairSorts } from '@entities/user/model';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { useController, useForm } from 'react-hook-form';

export function usePairSorts() {
  const dispatch = useAppDispatch();
  const pairSorts = useAppSelector((state) => state.user.pairSorts);

  const { control, handleSubmit, reset } = useForm<PairSorts>({
    defaultValues: pairSorts,
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

  const toggleInterest = (item: Interest): void => {
    if (interests.some((interest) => interest.name === item.name)) {
      setInterests(interests.filter((interest) => interest.name !== item.name));
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
    dispatch(setPairSorts(data));
  });

  const forcedToggleInterest = (item: Interest): void => {
    toggleInterest(item);
    submitHandler();
  };

  const forcedToggleAccount = (item: string): void => {
    toggleAccount(item);
    submitHandler();
  };

  const handleReset = () => {
    reset(INITIAL_SORTS);
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
