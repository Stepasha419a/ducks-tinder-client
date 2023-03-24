import classNames from 'classnames';
import { INTERESTS_LIST } from '../../../shared/constants';
import { Button, Popup } from '../../../shared/ui';
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
        {INTERESTS_LIST.map((interest) => {
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
