import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC, ReactElement } from 'react';
import type { Message } from '@shared/api';

interface SelectProps {
  isSelectOpen: boolean;
  isMessageEditing: boolean;
  select: ReactElement;
  message: Message;
  handleSelectMessage: (message: Message) => void;
  isChatBlocked?: boolean;
}

export const Select: FC<SelectProps> = ({
  handleSelectMessage,
  isSelectOpen,
  isMessageEditing,
  message,
  select,
  isChatBlocked,
}) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  if (isMobile || isChatBlocked) {
    return null;
  }

  const isSelect = isSelectOpen && !isMessageEditing;

  return isSelect ? (
    select
  ) : (
    <FontAwesomeIcon
      onClick={() => handleSelectMessage(message)}
      className="dots"
      icon={faEllipsis}
    />
  );
};
