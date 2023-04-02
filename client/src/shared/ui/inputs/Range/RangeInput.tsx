import classNames from 'classnames';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { makeRangeStyles } from './helpers';
import styles from './RangeInput.module.scss';
import { RangeInputProps } from './RangeInput.types';
import MultiRangeInput from './variants/MultiRangeInput';
import SingleRangeInput from './variants/SingleRangeInput';

export const RangeInput: FC<RangeInputProps> = ({
  value,
  min,
  max,
  step = 1,
  setValue,
  completeValue = () => {},
  isMultiple = false,
  extraWrapperClassName,
}) => {
  const rangeStyles = makeRangeStyles(isMultiple, min, max, value);

  const cnWrapper = classNames(
    styles.slider,
    styles.flat,
    extraWrapperClassName
  );

  const handleRangeChange = (min: number, max: number) => {
    if (min + 2 < max) {
      setValue!({ min, max });
    }
  };

  const handleChange = (value: number) => {
    setValue({ value });
  };

  const checkIsMultiple = isMultiple && value.min && value.max;

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
          completeValue={completeValue}
          min={min}
          max={max}
          step={step}
        >
          <div className={styles.slider__progress}></div>
        </MultiRangeInput>
      ) : (
        <SingleRangeInput
          value={value.value!}
          setValue={handleChange!}
          completeValue={completeValue}
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