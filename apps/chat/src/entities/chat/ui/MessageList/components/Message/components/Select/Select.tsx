import type { FC, ReactElement } from 'react';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { Message } from '@ducks-tinder-client/common';
import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

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
