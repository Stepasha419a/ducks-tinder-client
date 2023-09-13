import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('Click me!'));
  },
};

export const Mark: Story = {
  render: () => (
    <Button variant="mark">
      <FontAwesomeIcon icon={faCircleInfo} />
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
  },
};
