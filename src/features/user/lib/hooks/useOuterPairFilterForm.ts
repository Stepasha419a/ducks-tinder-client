import type { PairFilterForm } from '@entities/user/model/pair/pair.interface';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

export function useOuterPairFilterForm(
  control: Control<PairFilterForm>,
  handleSubmit: () => void
) {
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

  const toggleInterest = (item: string): void => {
    if (interests.some((interest) => interest === item)) {
      setInterests(interests.filter((interest) => interest !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const forcedToggleInterest = (item: string): void => {
    toggleInterest(item);
    handleSubmit();
  };

  const forcedToggleHasInterests = (): void => {
    setHasInterests(!hasInterests);
    handleSubmit();
  };

  return {
    hasInterests,
    forcedToggleHasInterests,
    interests,
    forcedToggleInterest,
  };
}
