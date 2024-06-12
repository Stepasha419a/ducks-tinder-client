import type { Dispatch, FC, SetStateAction } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem } from '@shared/ui';
import { useOuterPairFilterForm } from '@features/user/lib';
import styles from './FilterPairsItems.module.scss';
import { useMediaQuery } from '@shared/lib/hooks';
import { INTERESTS_FOR_LOOP } from '@/entities/user/lib';
import type { PairFilterForm } from '@/entities/user/model/pair';
import type { Control } from 'react-hook-form';

interface FilterPairsItemsProps {
  isFilterPopupOpen: boolean;
  setIsFilterPopupOpen: Dispatch<SetStateAction<boolean>>;
  control: Control<PairFilterForm>;
  handleSubmit: () => void;
}

export const FilterPairsItems: FC<FilterPairsItemsProps> = ({
  isFilterPopupOpen,
  setIsFilterPopupOpen,
  control,
  handleSubmit,
}) => {
  const isSmallMobile = useMediaQuery('(max-width: 600px)');

  const {
    hasInterests,
    forcedToggleHasInterests,
    interests,
    forcedToggleInterest,
  } = useOuterPairFilterForm(control, handleSubmit);

  return (
    <>
      <div className={styles.filtering}>
        <ListItem
          onClick={() => setIsFilterPopupOpen(true)}
          pointer
          isActive={isFilterPopupOpen}
          extraClassName={styles.item}
        >
          <FontAwesomeIcon className={styles.icon} icon={faSliders} />
        </ListItem>
        {!isSmallMobile &&
          INTERESTS_FOR_LOOP.map((item) => {
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
