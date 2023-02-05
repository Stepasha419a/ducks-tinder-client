import { InputHTMLAttributes } from 'react';

export interface RangeInterface {
  min: number;
  max: number;
}

export type RangeValue = number | RangeInterface;

export interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: RangeValue | any;
  setValue: (value: RangeValue) => void;
  completeValue?: () => void;
  isMultiple?: boolean;
  extraWrapperClassName?: string;
}

export interface SingleRangeInputProps {
  value: number;
  setValue: (value: number) => void;
  completeValue: () => void;
}

export interface MultiRangeInputProps {
  value: RangeInterface;
  setValue: (min: number, max: number) => void;
  completeValue: () => void;
}
