import type { Dispatch, FC, SetStateAction } from 'react';
import { ListItem } from '@shared/ui';
import styles from './SortPairsItems.mobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

interface SortPairsItemsProps {
  isSortPopupOpen: boolean;
  setIsSortPopupOpen: Dispatch<SetStateAction<boolean>>;
  hasInterests: boolean;
  forcedHasInterests: () => void;
}

export const SortPairsItemsMobile: FC<SortPairsItemsProps> = ({
  isSortPopupOpen,
  setIsSortPopupOpen,
  hasInterests,
  forcedHasInterests,
}) => (
  <>
    <div className={styles.sorting}>
      <ListItem
        onClick={() => setIsSortPopupOpen(true)}
        pointer
        isActive={isSortPopupOpen}
        extraClassName={styles.item}
      >
        <FontAwesomeIcon className={styles.icon} icon={faSliders} />
      </ListItem>
      <ListItem
        onClick={forcedHasInterests}
        pointer
        isActive={hasInterests}
        extraClassName={styles.item}
      >
        have interests
      </ListItem>
    </div>
  </>
);
