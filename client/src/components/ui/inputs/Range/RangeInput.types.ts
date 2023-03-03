export type RangeValue = {
  min?: number;
  max?: number;
  value?: number;
};

export interface RangeInputProps {
  value: RangeValue;
  min: number;
  max: number;
  step?: number;
  setValue: (value: RangeValue) => void;
  completeValue?: () => void;
  isMultiple?: boolean;
  extraWrapperClassName?: string;
}

export interface SingleRangeInputProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  setValue: (value: number) => void;
  completeValue: () => void;
}

export interface MultiRangeInputProps {
  value: RangeValue;
  min: number;
  max: number;
  step?: number;
  setValue: (min: number, max: number) => void;
  completeValue: () => void;
}
