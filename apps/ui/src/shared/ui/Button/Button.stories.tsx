import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { Button } from './Button';

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
    <Button {...args} style={{ height: '60px', width: '180px' }}>
      Click me!
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Click me!'));
  },
};

export const Gradient: Story = {
  render: (args) => (
    <Button
      variant="gradient"
      style={{
        height: '60px',
        width: '180px',
        color: 'var(--color--white-100)',
      }}
      {...args}
    >
      Click me!
    </Button>
  ),
  args: {
    variant: 'gradient',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Click me!'));
  },
};

export const Mark: Story = {
  render: (args) => (
    <Button variant="mark" {...args}>
      <FontAwesomeIcon icon={faCircleInfo} />
    </Button>
  ),
  args: {
    variant: 'mark',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
  },
};
