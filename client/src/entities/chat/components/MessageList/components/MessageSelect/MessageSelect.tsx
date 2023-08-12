import type { FC, ReactElement } from 'react';
import { useMediaQuery } from '@/shared/lib/hooks';
import { Message } from '../Message/Message';

interface MessageSelectProps {
  isSelectOpen: boolean;
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
  select,
}) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return null;
  }

  return isSelectOpen ? (
    select
  ) : (
    <Message.Select
      handleSelectMessage={() => handleSelectMessage()}
      {...getSelectProps()}
    />
  );
};
