import type { Meta, StoryObj } from '@storybook/react';
import { ImageSlider } from './ImageSlider';

const meta = {
  title: 'UI/ImageSlider',
  component: ImageSlider,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ImageSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <div
      style={{
        height: '667px',
        width: '375px',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <ImageSlider {...args} />
    </div>
  ),
  args: {
    images: [
      { name: '1.jpg', order: 0 },
      { name: '2.jpg', order: 1 },
      { name: '3.jpg', order: 2 },
    ],
    userId: 'user-id',
  },
};
