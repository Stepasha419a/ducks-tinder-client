import type { Meta, StoryObj } from '@storybook/react';
import { RegistrationForm } from './RegistrationForm';
import { WithTanstackQueryProvider } from '@ducks-tinder-client/common';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'RegistrationForm',
  component: RegistrationForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof RegistrationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: WithTanstackQueryProvider(() => {
    return (
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );
  }),
};
