import type { FC } from 'react';

import { BlockChat, DeleteChat } from './ui';

interface ChatControlProps {
  submitDelete?: () => void;
}

export const ChatControl: FC<ChatControlProps> = ({ submitDelete }) => {
  return (
    <div>
      <BlockChat />
      <DeleteChat submitDelete={submitDelete} />
    </div>
  );
};
