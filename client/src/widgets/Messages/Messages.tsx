import { useState, type FC, type ReactElement } from 'react';
import { MessageList } from '@entities/chat/components';
import { EditMessage, MessageSelect } from '@features/chat';

export const Messages: FC = (): ReactElement => {
  const [editingValue, setEditingValue] = useState('');

  return (
    <MessageList
      setEditingValue={setEditingValue}
      edit={
        <EditMessage
          editingValue={editingValue}
          setEditingValue={setEditingValue}
        />
      }
      select={<MessageSelect editingValue={editingValue} />}
    />
  );
};
