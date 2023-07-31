import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <Button {...args} style={{ height: '60px', width: '180px' }}>Click me!</Button>
  ),
};

export const Gradient: Story = {
  render: () => (
    <Button
      variant="gradient"
      style={{
        height: '60px',
        width: '180px',
        color: 'var(--color--white-100)',
      }}
    >
      Click me!
    </Button>
  ),
};

export const Mark: Story = {
  render: () => (
    <Button variant="mark">
      <FontAwesomeIcon icon={faCircleInfo} />
    </Button>
  ),
};
