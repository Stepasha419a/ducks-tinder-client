import { Button } from '../../../../ui';
import styles from './InterestsListPopup.module.scss'

interface InterestsListPopupProps {
  setIsInterestsListPopupOpen: (setting: boolean) => void;
  interestsList: string[];
}

const InterestsListPopup: React.FC<InterestsListPopupProps> = ({
  interestsList,
  setIsInterestsListPopupOpen,
}) => {
  return (
    <div className={styles.popup}>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>Interests</div>
          <div
            onClick={() => setIsInterestsListPopupOpen(false)}
            className={styles.close}
          ></div>
          <div className={styles.items}>
            {interestsList.map((item) => {
              return (
                <div
                  key={item}
                  className={styles.item}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <Button variant='closePopup' onClick={() => setIsInterestsListPopupOpen(false)}>Close</Button>
        </div>
        <div
          onClick={() => setIsInterestsListPopupOpen(false)}
          className={styles.closeArea}
        ></div>
      </div>
    </div>
  );
};

export default InterestsListPopup;
