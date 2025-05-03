import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { makeRangeStyles } from './helpers';
import type { RangeInputProps } from './RangeInput.types';
import { MultiRangeInput, SingleRangeInput } from './variants';
import styles from './RangeInput.module.scss';

export const RangeInput: FC<RangeInputProps> = ({
  value,
  min,
  max,
  step = 1,
  setValue,
  completeValue = null,
  isMultiple = false,
  extraWrapperClassName,
}) => {
  const rangeStyles = makeRangeStyles(isMultiple, min, max, value);

  const cnWrapper = classNames(
    styles.slider,
    styles.flat,
    extraWrapperClassName
  );

  const handleRangeChange = (firstValue: number, secondValue: number): void => {
    if (firstValue + 2 < secondValue) {
      setValue({ min: firstValue, max: secondValue });
    }
  };

  const handleChange = (currentValue: number): void => {
    setValue({ value: currentValue });
  };

  const checkIsMultiple =
    isMultiple && Boolean(value.min) && Boolean(value.max);

  return (
    <div
      className={cnWrapper}
      style={
        rangeStyles as DetailedHTMLProps<
          HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >
      }
    >
      {checkIsMultiple ? (
        <MultiRangeInput
          value={value}
          setValue={handleRangeChange}
          completeValue={() => completeValue && completeValue()}
          min={min}
          max={max}
          step={step}
        >
          <div className={styles.slider__progress}></div>
        </MultiRangeInput>
      ) : (
        <SingleRangeInput
          value={value.value!}
          setValue={handleChange}
          completeValue={() => completeValue && completeValue()}
          min={min}
          max={max}
          step={step}
        >
          <div className={styles.slider__progress}></div>
        </SingleRangeInput>
      )}
    </div>
  );
};
