import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxInput } from './Checkbox';

const meta = {
  title: 'UI/Input/Checkbox',
  component: CheckboxInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <div
      style={{
        height: '53px',
        padding: '0 24px',
        width: '350px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CheckboxInput {...args} />
    </div>
  ),
  args: {
    checked: true,
    text: 'Show people only in this range',
  },
};
