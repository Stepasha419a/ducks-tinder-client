import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC, ReactElement } from 'react';
import { useMediaQuery } from '@shared/lib/hooks';

interface SelectProps {
  isSelectOpen: boolean;
  isMessageEditing: boolean;
  select: ReactElement;
  handleSelectMessage: () => void;
  getSelectProps: () => {
    isSelectOpen: boolean;
  };
}

export const Select: FC<SelectProps> = ({
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
    <FontAwesomeIcon
      onClick={handleSelectMessage}
      className="dots"
      icon={faEllipsis}
      {...getSelectProps()}
    />
  );
};
