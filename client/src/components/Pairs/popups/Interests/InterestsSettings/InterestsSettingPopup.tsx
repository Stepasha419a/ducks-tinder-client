import { interestsList } from '../../../../../models/IUser';
import styles from './InterestsSettingPopup.module.scss';

interface InterestsSettingPopupProps {
  pairInterests: string[];
  addSort: (sort: string, field: string) => void;
  deleteSort: (sort: string, field: string) => void;
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
}

const InterestsSettingPopup: React.FC<InterestsSettingPopupProps> = ({
  pairInterests,
  addSort,
  deleteSort,
  setIsInterestsSettingPopupOpen,
}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.body}>
        <div className={`${styles.content} ${styles.content_overflow}`}>
          <div className={styles.title}>Interests</div>
          <div
            onClick={() => setIsInterestsSettingPopupOpen(false)}
            className={styles.close}
          ></div>
          <div className={styles.items}>
            {interestsList.map((item) => {
              return (
                <div
                  onClick={() => {
                    pairInterests.includes(item)
                      ? deleteSort(item, 'interests')
                      : addSort(item, 'interests');
                  }}
                  key={item}
                  className={`${styles.item} ${
                    pairInterests.includes(item) ? styles.item_active : ''
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setIsInterestsSettingPopupOpen(false)}
            className={styles.confirm}
          >
            Confirm
          </button>
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
