import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faHeart } from '@fortawesome/free-solid-svg-icons';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Button variant="default" style={{ height: '60px', width: '180px' }}>
      Click me!
    </Button>
  ),
};

export const AuthForm: Story = {
  render: () => (
    <Button variant="auth" style={{ height: '60px', width: '180px' }}>
      Click me!
    </Button>
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

export const Setting: Story = {
  render: () => (
    <Button
      variant="setting"
      style={{ borderRight: '1px solid var(--border-main)' }}
    >
      Submit setting
    </Button>
  ),
};

export const Tinder: Story = {
  render: () => (
    <div>
      <Button
        variant="tinder"
        style={{
          borderColor: 'var(--color--green-100)',
          width: '70px',
          height: '70px',
        }}
      >
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            fontSize: '28px',
            color: 'var(--color--green-80)',
          }}
        />
      </Button>
    </div>
  ),
};
