import { RangeValue } from './../RangeInput.types';

export function makeRangeStyles(
  isMultiple: boolean,
  min: number,
  max: number,
  value: RangeValue
) {
  if (isMultiple) {
    return {
      '--min': min,
      '--max': max,
      '--value-a': value.min,
      '--value-b': value.max,
      '--suffix': '%',
    };
  }

  return {
    '--min': min,
    '--max': max,
    '--value-a': value.value,
    '--suffix': '%',
  };
}
