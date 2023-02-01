import { FC, PropsWithChildren } from 'react';

interface SingleRangeInputProps {
  value: number;
  setValue: (value: number) => void;
  completeValue: () => void;
}

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
