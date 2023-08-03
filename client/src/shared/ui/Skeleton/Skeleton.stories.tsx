import type { Meta, StoryObj } from '@storybook/react';
import type { SkeletonProps } from 'react-loading-skeleton';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args: SkeletonProps) => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Skeleton {...args} />
    </div>
  ),
  args: {
    height: 30,
    width: 180,
    count: 1,
    circle: false,
    baseColor: '#d3d3d3',
    borderRadius: 0,
    direction: 'ltr',
    duration: 1.5,
    enableAnimation: true,
    highlightColor: '#f5f5f5',
  },
};
