import { FC, PropsWithChildren } from 'react';
import { RangeInterface } from '../RangeInput.types';
import SingleRangeInput from './SingleRangeInput';

interface MultiRangeInputProps {
  value: RangeInterface;
  setValue: (min: number, max: number) => void;
  completeValue: () => void;
}

const MultiRangeInput: FC<PropsWithChildren<MultiRangeInputProps>> = ({
  value,
  setValue,
  completeValue,
  children,
  ...props
}) => {
  const minHandler = (min: number) => {
    if (min + 2 < value.max) {
      setValue(min, value.max);
    }
  };

  const maxHandler = (max: number) => {
    if (value.min + 2 < max) {
      setValue(value.min, max);
    }
  };

  return (
    <>
      <SingleRangeInput
        value={value.min}
        setValue={minHandler}
        completeValue={completeValue}
        {...props}
      />
      <SingleRangeInput
        value={value.max}
        setValue={maxHandler}
        completeValue={completeValue}
        {...props}
      />
      {children}
    </>
  );
};

export default MultiRangeInput;
