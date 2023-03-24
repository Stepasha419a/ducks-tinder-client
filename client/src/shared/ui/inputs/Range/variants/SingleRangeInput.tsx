import { FC, PropsWithChildren } from 'react';
import { SingleRangeInputProps } from '../RangeInput.types';

const SingleRangeInput: FC<PropsWithChildren<SingleRangeInputProps>> = ({
  value,
  setValue,
  completeValue,
  children,
  ...props
}) => {
  return (
    <>
      <input
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        onMouseUp={() => completeValue()}
        type="range"
        {...props}
      />
      {children}
    </>
  );
};

export default SingleRangeInput;
