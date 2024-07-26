import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC, ReactElement } from 'react';
import type { Message } from '@shared/api';
import { useAdaptiveMediaQuery } from '@shared/lib';

interface SelectProps {
  isSelectOpen: boolean;
  isMessageEditing: boolean;
  select: ReactElement;
  message: Message;
  handleSelectMessage: (message: Message) => void;
}

export const Select: FC<SelectProps> = ({
  handleSelectMessage,
  isSelectOpen,
  isMessageEditing,
  message,
  select,
}) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  if (isMobile) {
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
