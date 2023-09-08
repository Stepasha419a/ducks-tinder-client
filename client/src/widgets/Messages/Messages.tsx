import type { FC, ReactElement } from 'react';
import { MessageList } from '@entities/chat/components';
import { MessageSelect } from '@features/chat';

export const Messages: FC = (): ReactElement => {
  return <MessageList select={<MessageSelect />} />;
};
