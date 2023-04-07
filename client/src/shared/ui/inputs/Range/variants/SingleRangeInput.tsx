import type { FC, PropsWithChildren, ReactElement } from 'react';
import type { SingleRangeInputProps } from '../RangeInput.types';

const SingleRangeInput: FC<PropsWithChildren<SingleRangeInputProps>> = ({
  value,
  setValue,
  completeValue,
  children,
  ...props
}): ReactElement => (
  <>
    <input
      value={value}
      onChange={(e) => setValue(+e.target.value)}
      onMouseUp={completeValue}
      type="range"
      {...props}
    />
    {children}
  </>
);

export default SingleRangeInput;
