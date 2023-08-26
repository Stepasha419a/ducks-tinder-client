import type { Dispatch, FC, SetStateAction } from 'react';
import { INTERESTS_FOR_LOOP } from '@entities/user/model';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem } from '@shared/ui';
import { usePairSorts } from '../lib';
import styles from './SortPairsItems.module.scss';
import { useMediaQuery } from '@shared/lib/hooks';
import { SortPairsItemsMobile } from './mobile/SortPairsItems.mobile';

interface SortPairsItemsProps {
  isSortPopupOpen: boolean;
  setIsSortPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const SortPairsItems: FC<SortPairsItemsProps> = ({
  isSortPopupOpen,
  setIsSortPopupOpen,
}) => {
  const isSmallMobile = useMediaQuery('(max-width: 600px)');

  const { account, forcedToggleAccount, interests, forcedToggleInterest } =
    usePairSorts();

  if (isSmallMobile) {
    return (
      <SortPairsItemsMobile
        isSortPopupOpen={isSortPopupOpen}
        setIsSortPopupOpen={setIsSortPopupOpen}
        account={account}
        forcedToggleAccount={forcedToggleAccount}
      />
    );
  }

  return (
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
        {INTERESTS_FOR_LOOP.map((item) => {
          return (
            <ListItem
              onClick={() => forcedToggleInterest({ name: item })}
              pointer
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
          pointer
          isActive={account.includes('have interests')}
          extraClassName={styles.item}
        >
          have interests
        </ListItem>
      </div>
    </>
  );
};
