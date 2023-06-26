export interface RangeValue {
  min?: number | null;
  max?: number | null;
  value?: number | null;
}

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

export interface RangeStyles {
  '--min': number;
  '--max': number;
  '--value-a': number;
  '--value-b'?: number;
  '--suffix': '%';
}
