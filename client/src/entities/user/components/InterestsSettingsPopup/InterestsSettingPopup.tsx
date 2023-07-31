import type { FC } from 'react';
import { Button, ListItem, Popup } from '@shared/ui';
import { INTERESTS_LIST } from '../../model';
import type { Interest } from '@shared/api/interfaces';
import styles from './InterestsSettingPopup.module.scss';

interface InterestsSettingPopupProps {
  pairInterests: Interest[];
  toggleInterest: (item: Interest) => void;
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
}

export const InterestsSettingPopup: FC<InterestsSettingPopupProps> = ({
  pairInterests,
  toggleInterest,
  setIsInterestsSettingPopupOpen,
}) => {
  return (
    <Popup
      title="Interests"
      closeHandler={() => setIsInterestsSettingPopupOpen(false)}
    >
      <div className={styles.items}>
        {INTERESTS_LIST.map((interest) => {
          const isActive = pairInterests.some((item) => interest === item.name);
          return (
            <ListItem
              onClick={() => toggleInterest({ name: interest })}
              isActive={isActive}
              key={interest}
            >
              {interest}
            </ListItem>
          );
        })}
      </div>
      <Button extraClassName={styles.btn} onClick={() => setIsInterestsSettingPopupOpen(false)}>
        Confirm
      </Button>
    </Popup>
  );
};
