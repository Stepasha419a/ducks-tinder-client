import type { FC } from 'react';
import type { Interest } from '@shared/api/interfaces';
import { Button, ListItem, Popup } from '@shared/ui';
import styles from './InterestsListPopup.module.scss';

interface InterestsListPopupProps {
  setIsInterestsListPopupOpen: (setting: boolean) => void;
  interestsList: Interest[];
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
          return <ListItem key={item.name}>{item.name}</ListItem>;
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
