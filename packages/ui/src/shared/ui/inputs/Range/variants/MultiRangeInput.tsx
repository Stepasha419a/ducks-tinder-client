import type { FC, PropsWithChildren } from 'react';

import type { MultiRangeInputProps } from '../RangeInput.types';
import { SingleRangeInput } from './SingleRangeInput';

export const MultiRangeInput: FC<PropsWithChildren<MultiRangeInputProps>> = ({
  value,
  setValue,
  completeValue,
  children,
  ...props
}) => {
  const minHandler = (min: number): void => {
    if (min + 2 < value.max!) {
      setValue(min, value.max!);
    }
  };

  const maxHandler = (max: number): void => {
    if (value.min! + 2 < max) {
      setValue(value.min!, max);
    }
  };

  return (
    <>
      <SingleRangeInput
        value={value.min!}
        setValue={minHandler}
        completeValue={completeValue}
        {...props}
      />
      <SingleRangeInput
        value={value.max!}
        setValue={maxHandler}
        completeValue={completeValue}
        {...props}
      />
      {children}
    </>
  );
};
