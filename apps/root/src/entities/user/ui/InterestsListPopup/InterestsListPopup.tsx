import { Button, ListItem, Popup } from '@ducks-tinder-client/ui';
import type { FC } from 'react';
import styles from './InterestsListPopup.module.scss';

interface InterestsListPopupProps {
  setIsInterestsListPopupOpen: (setting: boolean) => void;
  interestsList: string[];
}

export const InterestsListPopup: FC<InterestsListPopupProps> = ({
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
          return <ListItem key={item}>{item}</ListItem>;
        })}
      </div>
      <Button
        extraClassName={styles.btn}
        onClick={() => setIsInterestsListPopupOpen(false)}
      >
        Close
      </Button>
    </Popup>
  );
};
