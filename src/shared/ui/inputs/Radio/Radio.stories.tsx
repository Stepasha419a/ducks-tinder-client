import type { Meta, StoryObj } from '@storybook/react';
import { useState, type FC } from 'react';
import type { RadioInputProps } from './Radio';
import { RadioInput } from './Radio';

const meta = {
  title: 'UI/Input/Radio',
  component: RadioInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RadioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: (args) => (
    <div style={{ width: '120px' }}>
      <RadioInput {...args} />
    </div>
  ),
  args: {
    checked: true,
    text: 'Option 1',
  },
};

const MultipleComponent: FC<RadioInputProps> = (args) => {
  const [color, setColor] = useState('red');

  return (
    <div style={{ width: '120px' }}>
      <RadioInput
        {...args}
        name="color"
        checked={color === 'red'}
        text="red"
        onChange={() => setColor('red')}
      />
      <RadioInput
        {...args}
        name="color"
        checked={color === 'green'}
        text="green"
        onChange={() => setColor('green')}
      />
      <RadioInput
        {...args}
        name="color"
        checked={color === 'yellow'}
        text="yellow"
        onChange={() => setColor('yellow')}
      />
      <RadioInput
        {...args}
        name="color"
        checked={color === 'blue'}
        text="blue"
        onChange={() => setColor('blue')}
      />
    </div>
  );
};

export const Multiple: Story = {
  render: (args) => <MultipleComponent {...args} />,
};
