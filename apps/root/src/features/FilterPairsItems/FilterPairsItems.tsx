import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';
import { ListItemButton, useOpenModal } from '@ducks-tinder-client/ui';

import type { PairFilterForm } from '@entities/user';
import { INTERESTS_FOR_LOOP } from '@entities/user';

import { useOuterPairFilterForm } from './lib';
import * as styles from './FilterPairsItems.module.scss';
import { useTranslation } from 'react-i18next';
import {
  PairsFilterPopup,
  type PairsFilterPopupProps,
  type PairsFilterPopupReturn,
} from '@features/PairsFilterPopup';

interface FilterPairsItemsProps {
  isFilterPopupOpen: boolean;
  control: Control<PairFilterForm>;
  handleSubmit: () => void;
  handleReset: () => void;
}

export const FilterPairsItems: FC<FilterPairsItemsProps> = ({
  isFilterPopupOpen,
  control,
  handleSubmit,
  handleReset,
}) => {
  const { t } = useTranslation();

  const { openModal } = useOpenModal();

  const handleOpenFilterPopup = async () => {
    const result = await openModal<
      PairsFilterPopupProps,
      PairsFilterPopupReturn
    >({
      Component: PairsFilterPopup,
      props: { control },
    });

    if (result?.isSubmit) {
      handleSubmit();
    }
    if (result?.isReset) {
      handleReset();
    }
  };

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
          onClick={handleOpenFilterPopup}
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
                {t(`user.interests.${item}`)}
              </ListItemButton>
            );
          })}
        <ListItemButton
          onClick={forcedToggleHasInterests}
          isActive={hasInterests}
          extraClassName={styles.item}
        >
          {t('pairs.filter.haveInterests')}
        </ListItemButton>
      </div>
    </>
  );
};
