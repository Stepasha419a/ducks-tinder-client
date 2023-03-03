import classNames from 'classnames';
import { interestsList } from '../../../../../models/User';
import { Button } from '../../../../ui';
import styles from './InterestsSettingPopup.module.scss';

interface InterestsSettingPopupProps {
  pairInterests: string[];
  toggleInterest: (sortSetting: string) => void;
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
            {interestsList.map((item) => {
              const cnItem = classNames(
                styles.item,
                pairInterests.includes(item) && styles.item_active
              );
              return (
                <div
                  onClick={() => toggleInterest(item)}
                  key={item}
                  className={cnItem}
                >
                  {item}
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
