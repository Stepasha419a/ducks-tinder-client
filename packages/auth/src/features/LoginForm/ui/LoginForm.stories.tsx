import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { WithTanstackQueryProvider } from '@ducks-tinder-client/common';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: WithTanstackQueryProvider(() => {
    return (
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  }),
};
