import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC, ReactElement } from 'react';
import { useAdaptiveMediaQuery } from '@shared/lib/hooks';

interface SelectProps {
  isSelectOpen: boolean;
  isMessageEditing: boolean;
  select: ReactElement;
  handleSelectMessage: () => void;
}

export const Select: FC<SelectProps> = ({
  handleSelectMessage,
  isSelectOpen,
  isMessageEditing,
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
      onClick={handleSelectMessage}
      className="dots"
      icon={faEllipsis}
    />
  );
};
