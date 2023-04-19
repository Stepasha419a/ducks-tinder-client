import type { FC } from 'react';
import { INTERESTS_LIST } from '@shared/constants';
import { Button, ListItem, Popup } from '@shared/ui';
import styles from './InterestsSettingPopup.module.scss';

interface InterestsSettingPopupProps {
  pairInterests: string[];
  toggleInterest: (item: string) => void;
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
          const includedItem = pairInterests.some((item) => item === interest);
          console.log(includedItem)
          return (
            <ListItem onClick={() => toggleInterest(interest)} isActive={includedItem} key={interest}>
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
