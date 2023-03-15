import classNames from 'classnames';
import { interestsList } from '../../../models/User/User';
import { Button, Popup } from '../../ui';
import styles from './InterestsSettingPopup.module.scss';

interface InterestsSettingPopupProps {
  pairInterests: string[];
  toggleInterest: (item: string) => void;
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
}

export const InterestsSettingPopup: React.FC<InterestsSettingPopupProps> = ({
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
        {interestsList.map((interest) => {
          const includedItem = pairInterests.some((item) => item === interest);
          const cnItem = classNames(styles.item, includedItem && styles.active);
          return (
            <div
              onClick={() => toggleInterest(interest)}
              key={interest}
              className={cnItem}
            >
              {interest}
            </div>
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
