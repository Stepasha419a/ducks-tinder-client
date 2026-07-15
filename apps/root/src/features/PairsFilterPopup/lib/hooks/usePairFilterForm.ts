import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { PairFilterForm } from '@entities/user';
import { useCallback } from 'react';

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

  const toggleInterest = useCallback(
    (item: string): void => {
      if (interests.some((interest) => interest === item)) {
        setInterests(interests.filter((interest) => interest !== item));
      } else {
        setInterests([...interests, item]);
      }
    },
    [interests, setInterests]
  );

  const toggleHasInterests = useCallback((): void => {
    setHasInterests(!hasInterests);
  }, [hasInterests, setHasInterests]);

  const toggleIdentifyConfirmed = useCallback((): void => {
    setIdentifyConfirmed(!identifyConfirmed);
  }, [identifyConfirmed, setIdentifyConfirmed]);

  return {
    hasInterests,
    identifyConfirmed,
    toggleHasInterests,
    toggleIdentifyConfirmed,
    interests,
    toggleInterest,
  };
}
