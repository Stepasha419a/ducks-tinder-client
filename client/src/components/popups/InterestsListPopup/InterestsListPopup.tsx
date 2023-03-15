import { Button, Popup } from '../../ui';
import styles from './InterestsListPopup.module.scss';

interface InterestsListPopupProps {
  setIsInterestsListPopupOpen: (setting: boolean) => void;
  interestsList: string[];
}

export const InterestsListPopup: React.FC<InterestsListPopupProps> = ({
  interestsList,
  setIsInterestsListPopupOpen,
}) => {
  return (
    <Popup
      title="Interests"
      closeHandler={() => setIsInterestsListPopupOpen(false)}
    >
      <div className={styles.items}>
        {interestsList.map((item) => {
          return (
            <div key={item} className={styles.item}>
              {item}
            </div>
          );
        })}
      </div>
      <Button
        variant="closePopup"
        onClick={() => setIsInterestsListPopupOpen(false)}
      >
        Close
      </Button>
    </Popup>
  );
};
