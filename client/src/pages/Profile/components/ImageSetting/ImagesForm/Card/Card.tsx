import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Card.module.scss';
import { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { Button } from '../../../../../../components/ui';

interface CardProps extends HTMLAttributes<HTMLImageElement> {
  src?: string;
  handler?: () => void;
  buttonHandler?: () => void;
}

export const Card: FC<CardProps> = ({
  src,
  handler,
  buttonHandler,
  ...props
}) => {
  const cn = classNames(styles.image, src && styles.hasImage);
  const cnIcon = classNames(styles.btn, src ? styles.xmark : styles.plus);
  const icon = src ? faXmark : faPlus;

  return (
    <div onClick={handler} className={styles.item}>
      {src ? (
        <img className={cn} {...props} src={src} alt="item" draggable />
      ) : (
        <div className={cn} />
      )}
      <Button onClick={buttonHandler} variant="mark" extraClassName={cnIcon}>
        <FontAwesomeIcon className={styles.mark} icon={icon} />
      </Button>
    </div>
  );
};
