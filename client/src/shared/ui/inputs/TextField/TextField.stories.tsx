import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta = {
  title: 'UI/Input/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <div style={{ width: '300px', height: '30px' }}>
      <TextField {...args} />
    </div>
  ),
};
