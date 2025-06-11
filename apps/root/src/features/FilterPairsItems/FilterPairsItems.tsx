import type { Dispatch, FC, SetStateAction } from 'react';
import type { Control } from 'react-hook-form';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { ListItemButton } from '@ducks-tinder-client/ui';

import type { PairFilterForm } from '@entities/user';
import { INTERESTS_FOR_LOOP } from '@entities/user';

import { useOuterPairFilterForm } from './lib';
import * as styles from './FilterPairsItems.module.scss';

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
  const isSmallMobile = useAdaptiveMediaQuery('(max-width: 600px)');

  const {
    hasInterests,
    forcedToggleHasInterests,
    interests,
    forcedToggleInterest,
  } = useOuterPairFilterForm(control, handleSubmit);

  return (
    <>
      <div className={styles.filtering}>
        <ListItemButton
          onClick={() => setIsFilterPopupOpen(true)}
          isActive={isFilterPopupOpen}
          extraClassName={styles.item}
        >
          <FontAwesomeIcon icon={faSliders} />
        </ListItemButton>
        {!isSmallMobile &&
          INTERESTS_FOR_LOOP.map((item) => {
            return (
              <ListItemButton
                onClick={() => forcedToggleInterest(item)}
                isActive={interests.some((interest) => interest === item)}
                extraClassName={styles.item}
                key={item}
              >
                {item}
              </ListItemButton>
            );
          })}
        <ListItemButton
          onClick={forcedToggleHasInterests}
          isActive={hasInterests}
          extraClassName={styles.item}
        >
          have interests
        </ListItemButton>
      </div>
    </>
  );
};
