import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';

const meta = {
  title: 'UI/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: (args) => <ListItem {...args}>list item</ListItem>,
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
      }}
    >
      {new Array(18).fill(null).map((_, i) => (
        <ListItem key={i} {...args}>
          list item {i}
        </ListItem>
      ))}
    </div>
  ),
};
