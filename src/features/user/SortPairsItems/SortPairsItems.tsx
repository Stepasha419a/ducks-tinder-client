import type { Dispatch, FC, SetStateAction } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem } from '@shared/ui';
import { usePairSorts } from '../lib';
import styles from './SortPairsItems.module.scss';
import { useMediaQuery } from '@shared/lib/hooks';
import { SortPairsItemsMobile } from './mobile/SortPairsItems.mobile';
import { INTERESTS_FOR_LOOP } from '@/entities/user/lib';

interface SortPairsItemsProps {
  isSortPopupOpen: boolean;
  setIsSortPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const SortPairsItems: FC<SortPairsItemsProps> = ({
  isSortPopupOpen,
  setIsSortPopupOpen,
}) => {
  const isSmallMobile = useMediaQuery('(max-width: 600px)');

  const {
    hasInterests,
    forcedToggleHasInterests,
    interests,
    forcedToggleInterest,
  } = usePairSorts();

  if (isSmallMobile) {
    return (
      <SortPairsItemsMobile
        isSortPopupOpen={isSortPopupOpen}
        setIsSortPopupOpen={setIsSortPopupOpen}
        hasInterests={hasInterests}
        forcedHasInterests={forcedToggleHasInterests}
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
              onClick={() => forcedToggleInterest(item)}
              pointer
              isActive={interests.some((interest) => interest === item)}
              extraClassName={styles.item}
              key={item}
            >
              {item}
            </ListItem>
          );
        })}
        <ListItem
          onClick={forcedToggleHasInterests}
          pointer
          isActive={hasInterests}
          extraClassName={styles.item}
        >
          have interests
        </ListItem>
      </div>
    </>
  );
};
