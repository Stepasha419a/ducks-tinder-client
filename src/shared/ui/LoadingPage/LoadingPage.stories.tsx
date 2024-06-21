import type { Meta, StoryObj } from '@storybook/react';
import { LoadingPage } from './LoadingPage';

const meta = {
  title: 'UI/LoadingPage',
  component: LoadingPage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoadingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <LoadingPage {...args} />,
  args: {
    visible: true,
    duration: 0.5,
  },
};
