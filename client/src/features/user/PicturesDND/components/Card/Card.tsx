import type { FC } from 'react';
import classNames from 'classnames';
import { Reorder } from 'framer-motion';
import type { Picture } from '@shared/api/interfaces';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@shared/ui';
import styles from './Card.module.scss';

interface CardProps {
  picture?: Picture;
  src?: string;
  handler?: () => void;
  buttonHandler?: () => void;
}

export const Card: FC<CardProps> = ({
  picture,
  src,
  handler,
  buttonHandler,
}) => {
  const isEmpty = !src;

  if (isEmpty) {
    return (
      <div onClick={handler} className={styles.item}>
        <div className={styles.image} />
        <Button
          onClick={handler}
          variant="mark"
          extraClassName={classNames(styles.btn, styles.plus)}
        >
          <FontAwesomeIcon className={styles.mark} icon={faPlus} />
        </Button>
      </div>
    );
  }

  return (
    <Reorder.Item
      drag
      whileDrag={{
        scale: 1.1,
      }}
      as="div"
      value={picture}
      className={styles.item}
    >
      <img
        className={classNames(styles.image, styles.hasImage)}
        src={src}
        alt="item"
        draggable={false}
      />
      <Button
        onClick={buttonHandler}
        variant="mark"
        extraClassName={classNames(styles.btn, styles.xmark)}
      >
        <FontAwesomeIcon className={styles.mark} icon={faXmark} />
      </Button>
    </Reorder.Item>
  );
};
