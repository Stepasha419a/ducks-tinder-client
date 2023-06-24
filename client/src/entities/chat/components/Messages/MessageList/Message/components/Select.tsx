import type { FC, ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styles from '../Message.module.scss';

interface SelectProps {
  isOwn: boolean;
  isSelectOpen: boolean;
  select: ReactElement;
  handleSelectMessage: () => void;
}

export const Select: FC<SelectProps> = ({
  isOwn,
  isSelectOpen,
  select,
  handleSelectMessage,
}) => {
  return (
    <>
      {isOwn &&
        (isSelectOpen ? (
          select
        ) : (
          <FontAwesomeIcon
            onClick={handleSelectMessage}
            className={styles.dots}
            icon={faEllipsis}
          />
        ))}
    </>
  );
};
