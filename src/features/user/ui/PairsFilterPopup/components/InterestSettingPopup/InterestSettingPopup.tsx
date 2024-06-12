import type { FC } from 'react';
import { Interest } from '@shared/api/interfaces';
import { Button, ListItem, Popup } from '@shared/ui';
import styles from './InterestSettingPopup.module.scss';

interface InterestSettingPopupProps {
  activeItems: string[];
  toggleItem: (item: string) => void;
  handleClose: () => void;
}

export const InterestSettingPopup: FC<InterestSettingPopupProps> = ({
  activeItems,
  toggleItem,
  handleClose,
}) => {
  return (
    <Popup title="Interests" closeHandler={handleClose}>
      <div className={styles.items}>
        {Object.values(Interest).map((selectItem) => {
          const isActive = activeItems.some((item) => selectItem === item);
          return (
            <ListItem
              onClick={() => toggleItem(selectItem)}
              isActive={isActive}
              pointer
              key={selectItem}
            >
              {selectItem}
            </ListItem>
          );
        })}
      </div>
      <Button extraClassName={styles.btn} onClick={handleClose}>
        Confirm
      </Button>
    </Popup>
  );
};
