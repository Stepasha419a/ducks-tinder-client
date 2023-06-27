import type { FC, ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import styles from '../Message.module.scss';
import { getDatesHourDiff } from '@/shared/helpers';

interface SelectProps {
  createdAt: Date;
  isOwn: boolean;
  isSelectOpen: boolean;
  select: ReactElement;
  handleSelectMessage: () => void;
}

export const Select: FC<SelectProps> = ({
  createdAt,
  isOwn,
  isSelectOpen,
  select,
  handleSelectMessage,
}) => {
  const isMessageDeleting =
    getDatesHourDiff(new Date(), new Date(createdAt)) < 12;

  if (isMessageDeleting && isOwn) {
    return isSelectOpen ? (
      select
    ) : (
      <FontAwesomeIcon
        onClick={handleSelectMessage}
        className={styles.dots}
        icon={faEllipsis}
      />
    );
  }
  return <></>;
};
