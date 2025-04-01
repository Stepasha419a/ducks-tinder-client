import type { FC } from 'react';
import { ListItem } from '@shared/ui';
import styles from './ListInfo.module.scss';

interface ListInfoProps {
  title: string;
  items: string[];
  handleShowAll?: () => void;
}

export const ListInfo: FC<ListInfoProps> = ({
  title,
  items,
  handleShowAll,
}) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className={styles.list}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.items}>
          {items.map((item) => (
            <ListItem key={item}>{item}</ListItem>
          ))}
        </div>
      </div>
      {handleShowAll && (
        <div onClick={handleShowAll} className={styles.showAll}>
          Show all
        </div>
      )}
    </div>
  );
};
