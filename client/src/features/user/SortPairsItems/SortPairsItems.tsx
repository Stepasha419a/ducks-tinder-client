import type { Dispatch, FC, SetStateAction } from 'react';
import { INTERESTS_FOR_LOOP } from '@entities/user/model';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem } from '@shared/ui';
import { usePairSorts } from '../lib';
import styles from './SortPairsItems.module.scss';

interface SortPairsItemsProps {
  isSortPopupOpen: boolean;
  setIsSortPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const SortPairsItems: FC<SortPairsItemsProps> = ({
  isSortPopupOpen,
  setIsSortPopupOpen,
}) => {
  const { account, forcedToggleAccount, interests, forcedToggleInterest } =
    usePairSorts();

  return (
    <>
      <div className={styles.sorting}>
        <ListItem
          onClick={() => setIsSortPopupOpen(true)}
          isActive={isSortPopupOpen}
          extraClassName={styles.item}
        >
          <FontAwesomeIcon className={styles.icon} icon={faSliders} />
        </ListItem>
        {INTERESTS_FOR_LOOP.map((item) => {
          return (
            <ListItem
              onClick={() => forcedToggleInterest({ name: item })}
              isActive={interests.some((interest) => interest.name === item)}
              extraClassName={styles.item}
              key={item}
            >
              {item}
            </ListItem>
          );
        })}
        <ListItem
          onClick={() => forcedToggleAccount('have interests')}
          isActive={account.includes('have interests')}
          extraClassName={styles.item}
        >
          have interests
        </ListItem>
      </div>
    </>
  );
};
