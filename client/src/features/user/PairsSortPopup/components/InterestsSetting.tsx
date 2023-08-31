import type { Dispatch, FC, SetStateAction } from 'react';
import { INTERESTS_FOR_LOOP } from '@entities/user/model';
import { ListItem } from '@shared/ui';
import type { NameObject } from '@shared/api/interfaces';
import styles from '../PairsSortPopup.module.scss';

interface InterestsSettingProps {
  interests: NameObject[];
  toggleInterest: (item: NameObject) => void;
  setIsInterestsSettingPopupOpen: Dispatch<SetStateAction<boolean>>;
}

export const InterestsSetting: FC<InterestsSettingProps> = ({
  interests,
  toggleInterest,
  setIsInterestsSettingPopupOpen,
}) => {
  return (
    <div className={styles.setting}>
      <div className={styles.name}>Interests</div>
      <div className={`${styles.change} ${styles.flex}`}>
        {INTERESTS_FOR_LOOP.slice(0, 3).map((item) => {
          return (
            <ListItem
              onClick={() => toggleInterest({ name: item })}
              isActive={interests.some((interest) => interest.name === item)}
              key={item}
              pointer
            >
              {item}
            </ListItem>
          );
        })}
      </div>
      <div
        onClick={() => setIsInterestsSettingPopupOpen(true)}
        className={styles.showAll}
      >
        Show all
      </div>
    </div>
  );
};
