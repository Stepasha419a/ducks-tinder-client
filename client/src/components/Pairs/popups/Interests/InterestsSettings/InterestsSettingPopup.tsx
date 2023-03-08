import classNames from 'classnames';
import { interestsList } from '../../../../../models/User';
import { Button } from '../../../../ui';
import styles from './InterestsSettingPopup.module.scss';

interface InterestsSettingPopupProps {
  pairInterests: string[];
  toggleInterest: (itemName: string, index?: number) => void;
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
}

const InterestsSettingPopup: React.FC<InterestsSettingPopupProps> = ({
  pairInterests,
  toggleInterest,
  setIsInterestsSettingPopupOpen,
}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>Interests</div>
          <div
            onClick={() => setIsInterestsSettingPopupOpen(false)}
            className={styles.close}
          ></div>
          <div className={styles.items}>
            {interestsList.map((interest) => {
              const includedItem = pairInterests.some(
                (item) => item === interest
              );
              const cnItem = classNames(
                styles.item,
                includedItem && styles.active
              );
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
        </div>
        <div
          onClick={() => setIsInterestsSettingPopupOpen(false)}
          className={styles.closeArea}
        ></div>
      </div>
    </div>
  );
};

export default InterestsSettingPopup;
