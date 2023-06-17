import type { FC } from 'react';
import { Button, ListItem, Popup } from '@shared/ui';
import { INTERESTS_LIST } from '../../model';
import type { Interest } from '@/shared/api/interfaces';
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
          const includedItem = pairInterests.some(
            (item) => item.name === interest
          );
          return (
            <ListItem
              onClick={() => toggleInterest({ name: interest })}
              isActive={includedItem}
              key={interest}
            >
              {interest}
            </ListItem>
          );
        })}
      </div>
      <Button
        variant="closePopup"
        onClick={() => setIsInterestsSettingPopupOpen(false)}
      >
        Confirm
      </Button>
    </Popup>
  );
};
