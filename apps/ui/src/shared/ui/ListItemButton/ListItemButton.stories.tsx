import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { ListItemButton } from './ListItemButton';

const meta = {
  title: 'UI/ListItemButton',
  component: ListItemButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ListItemButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: (args) => <ListItemButton {...args}>list item</ListItemButton>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
  },
};

export const Many: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        width: '375px',
        height: '667px',
        border: '1px solid var(--border-main)',
        padding: '10px',
        gap: '10px',
      }}
    >
      {new Array(18).fill(null).map((_, i) => (
        <ListItemButton key={i} {...args}>
          list item {i}
        </ListItemButton>
      ))}
    </div>
  ),
};
