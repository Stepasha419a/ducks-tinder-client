import type { FC } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import type { Picture } from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';

import * as styles from './Card.module.scss';

interface CardProps {
  picture?: Picture;
  src?: string;
  onAdd: () => void;
}

export const Card: FC<CardProps> = ({ onAdd }) => (
  <div onClick={onAdd} className={styles.item}>
    <div className={styles.image} />
    <Button
      onClick={onAdd}
      variant="mark"
      extraClassName={classNames(styles.btn, styles.plus)}
    >
      <FontAwesomeIcon className={styles.mark} icon={faPlus} />
    </Button>
  </div>
);
