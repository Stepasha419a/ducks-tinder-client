import type { Meta, StoryObj } from '@storybook/react';
import type { FC } from 'react';
import { useState } from 'react';
import { RangeInput } from './RangeInput';
import type { RangeInputProps } from './RangeInput.types';

const meta = {
  title: 'UI/Input/Range',
  component: RangeInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RangeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const SingleComponent: FC<RangeInputProps> = (props) => {
  const [value, setValue] = useState(props.value.value);

  return (
    <div style={{ width: '400px' }}>
      <div>current value: {value}</div>
      <RangeInput
        {...props}
        value={{ value: value }}
        setValue={(val) => setValue(val.value)}
      />
    </div>
  );
};

export const Single: Story = {
  render: (args) => <SingleComponent {...args} />,
  args: {
    max: 100,
    min: 2,
    value: { value: 50 },
  },
};

const MultipleComponent: FC<RangeInputProps> = (props) => {
  const [value, setValue] = useState({
    min: props.value.min,
    max: props.value.max,
  });

  return (
    <div style={{ width: '400px' }}>
      <div>
        min: {value.min}, max: {value.max}
      </div>
      <RangeInput
        {...props}
        value={value}
        setValue={(val) => setValue({ min: val.min, max: val.max })}
        isMultiple
      />
    </div>
  );
};

export const Multiple: Story = {
  render: (args) => <MultipleComponent {...args} />,
  args: {
    max: 100,
    min: 2,
    value: { min: 20, max: 60 },
  },
};
