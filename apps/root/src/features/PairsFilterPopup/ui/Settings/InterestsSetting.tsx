import { useMemo, type FC } from 'react';

import { ListItemButton, useOpenReactiveModal } from '@ducks-tinder-client/ui';

import { INTERESTS_FOR_LOOP } from '@entities/user';

import * as styles from '../../PairsFilterPopup.module.scss';
import { useTranslation } from 'react-i18next';
import type { InterestSettingPopupProps } from '../InterestSettingPopup/InterestSettingPopup';
import { InterestSettingPopup } from '../InterestSettingPopup/InterestSettingPopup';

interface InterestsSettingProps {
  interests: string[];
  toggleInterest: (item: string) => void;
}

export const InterestsSetting: FC<InterestsSettingProps> = ({
  interests,
  toggleInterest,
}) => {
  const { t } = useTranslation();

  const props = useMemo<InterestSettingPopupProps>(
    () => ({ activeItems: interests, toggleItem: toggleInterest }),
    [interests, toggleInterest]
  );

  const { openModal } = useOpenReactiveModal<InterestSettingPopupProps>(
    InterestSettingPopup,
    props
  );

  return (
    <div className={styles.setting}>
      <div className={styles.name}>{t('pairs.filter.interests.title')}</div>
      <div className={`${styles.change} ${styles.flex}`}>
        {INTERESTS_FOR_LOOP.slice(0, 3).map((item) => {
          return (
            <ListItemButton
              onClick={() => toggleInterest(item)}
              isActive={interests.some((interest) => interest === item)}
              key={item}
              type="button"
            >
              {t(`user.interests.${item}`)}
            </ListItemButton>
          );
        })}
      </div>
      <div onClick={openModal} className={styles.showAll}>
        {t('pairs.filter.interests.showAll')}
      </div>
    </div>
  );
};
