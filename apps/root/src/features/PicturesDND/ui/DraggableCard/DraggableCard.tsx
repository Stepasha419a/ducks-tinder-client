import type { FC } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import type { Picture } from '@ducks-tinder-client/common';
import { Button } from '@ducks-tinder-client/ui';

import * as styles from './DraggableCard.module.scss';

import { useSortable } from '@dnd-kit/react/sortable';

interface DraggableCardProps {
  picture: Picture;
  src: string;
  onDelete?: () => void;
}

export const DraggableCard: FC<DraggableCardProps> = ({
  picture,
  src,
  onDelete,
}) => {
  const { ref, isDragging } = useSortable({
    id: picture.id,
    index: picture.order,
    type: 'item',
    accept: 'item',
  });

  return (
    <div ref={ref} data-dragging={isDragging} className={styles.item}>
      <img
        className={classNames(styles.image, styles.hasImage)}
        src={src}
        alt="item"
        draggable={false}
      />
      <Button
        onClick={onDelete}
        variant="mark"
        extraClassName={classNames(styles.btn, styles.xmark)}
      >
        <FontAwesomeIcon className={styles.mark} icon={faXmark} />
      </Button>
    </div>
  );
};
