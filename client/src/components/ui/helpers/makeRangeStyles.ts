import { RangeInterface } from '../inputs/Range/types/RangeInput.types';

export const makeRangeStyles = (
  isMultiple: boolean,
  min: number,
  max: number,
  value: RangeInterface
) => {
  if (isMultiple) {
    return {
      '--min': min,
      '--max': max,
      '--value-a': value.min || 18,
      '--value-b': value.max || 24,
      '--suffix': '%',
    };
  }

  return {
    '--min': min,
    '--max': max,
    '--value-a': value,
    '--suffix': '%',
  };
};
