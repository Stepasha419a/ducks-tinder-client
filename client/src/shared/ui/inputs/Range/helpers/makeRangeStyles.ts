import type { RangeStyles, RangeValue } from '../RangeInput.types';

export function makeRangeStyles(
  isMultiple: boolean,
  min: number,
  max: number,
  value: RangeValue,
): RangeStyles {
  if (isMultiple) {
    return {
      '--min': min,
      '--max': max,
      '--value-a': value.min!,
      '--value-b': value.max!,
      '--suffix': '%',
    };
  }

  return {
    '--min': min,
    '--max': max,
    '--value-a': value.value!,
    '--suffix': '%',
  };
}
