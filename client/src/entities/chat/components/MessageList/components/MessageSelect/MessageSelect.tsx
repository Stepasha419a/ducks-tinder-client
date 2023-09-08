import type { FC, ReactElement } from 'react';
import { useMediaQuery } from '@shared/lib/hooks';
import { Message } from '../Message/Message';

interface MessageSelectProps {
  isSelectOpen: boolean;
  isMessageEditing: boolean;
  select: ReactElement;
  handleSelectMessage: () => void;
  getSelectProps: () => {
    isSelectOpen: boolean;
  };
}

export const MessageSelect: FC<MessageSelectProps> = ({
  getSelectProps,
  handleSelectMessage,
  isSelectOpen,
  isMessageEditing,
  select,
}) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return null;
  }

  const isSelect = isSelectOpen && !isMessageEditing;

  return isSelect ? (
    select
  ) : (
    <Message.Select
      handleSelectMessage={() => handleSelectMessage()}
      {...getSelectProps()}
    />
  );
};
