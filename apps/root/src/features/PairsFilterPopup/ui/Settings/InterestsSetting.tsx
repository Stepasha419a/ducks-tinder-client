import type { Dispatch, FC, SetStateAction } from 'react';

import { ListItemButton } from '@ducks-tinder-client/ui';

import { INTERESTS_FOR_LOOP } from '@entities/user';

import * as styles from '../../PairsFilterPopup.module.scss';
import { useTranslation } from 'react-i18next';

interface InterestsSettingProps {
  interests: string[];
  toggleInterest: (item: string) => void;
  setIsInterestsSettingPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const InterestsSetting: FC<InterestsSettingProps> = ({
  interests,
  toggleInterest,
  setIsInterestsSettingPopupOpen,
}) => {
  const { t } = useTranslation();

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
      <div
        onClick={() => setIsInterestsSettingPopupOpen(true)}
        className={styles.showAll}
      >
        {t('pairs.filter.interests.showAll')}
      </div>
    </div>
  );
};
