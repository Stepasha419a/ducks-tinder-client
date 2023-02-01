import { InputHTMLAttributes } from "react";

export interface RangeInterface {
  min: number;
  max: number;
}

export interface RangeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: number | RangeInterface | any;
  setValue: (value: number | RangeInterface) => void;
  completeValue: () => void;
  isMultiple?: boolean;
  extraWrapperClassName?: string;
}