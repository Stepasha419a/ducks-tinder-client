import type { PairFilterForm } from '@entities/user/model/pair/pair.interface';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

export function usePairFilterForm(control: Control<PairFilterForm>) {
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

  const toggleHasInterests = (): void => {
    setHasInterests(!hasInterests);
  };

  const toggleIdentifyConfirmed = (): void => {
    setIdentifyConfirmed(!identifyConfirmed);
  };

  return {
    hasInterests,
    identifyConfirmed,
    toggleHasInterests,
    toggleIdentifyConfirmed,
    interests,
    toggleInterest,
  };
}
