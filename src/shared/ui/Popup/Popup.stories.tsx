import type { Meta, StoryObj } from '@storybook/react';
import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Popup } from './Popup';
import type { PopupProps } from './Popup.types';

const meta = {
  title: 'UI/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

const PopupComponent: FC<PopupProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button
        style={{ padding: '10px 40px' }}
        rounded
        border
        onClick={() => setIsOpen(true)}
      >
        open
      </Button>
      {isOpen && (
        <Popup {...args} closeHandler={() => setIsOpen(false)}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            content
          </div>
        </Popup>
      )}
    </>
  );
};

export const Primary: Story = {
  render: (args) => <PopupComponent {...args} />,
  args: {
    size: 'm',
    title: 'Popup title',
  },
};
