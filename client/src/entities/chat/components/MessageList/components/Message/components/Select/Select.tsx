import type { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import './Select.scss';

interface SelectProps {
  handleSelectMessage: () => void;
}

export const Select: FC<SelectProps> = ({ handleSelectMessage }) => {
  return (
    <FontAwesomeIcon
      onClick={handleSelectMessage}
      className="dots"
      icon={faEllipsis}
    />
  );
};
