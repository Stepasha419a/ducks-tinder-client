import type { Dispatch, FC, SetStateAction } from 'react';
import { ListItem } from '@shared/ui';
import styles from './SortPairsItems.mobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

interface SortPairsItemsProps {
  isSortPopupOpen: boolean;
  setIsSortPopupOpen: Dispatch<SetStateAction<boolean>>;
  account: string[];
  forcedToggleAccount: (item: string) => void;
}

export const SortPairsItemsMobile: FC<SortPairsItemsProps> = ({
  isSortPopupOpen,
  setIsSortPopupOpen,
  account,
  forcedToggleAccount,
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
        onClick={() => forcedToggleAccount('have interests')}
        pointer
        isActive={account.includes('have interests')}
        extraClassName={styles.item}
      >
        have interests
      </ListItem>
    </div>
  </>
);
