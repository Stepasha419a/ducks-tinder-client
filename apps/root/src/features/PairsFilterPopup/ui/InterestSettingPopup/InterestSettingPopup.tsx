import type { FC } from 'react';

import { Interest } from '@ducks-tinder-client/common';
import { Button, ListItemButton, Popup } from '@ducks-tinder-client/ui';

import * as styles from './InterestSettingPopup.module.scss';

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
            <ListItemButton
              onClick={() => toggleItem(selectItem)}
              isActive={isActive}
              key={selectItem}
            >
              {selectItem}
            </ListItemButton>
          );
        })}
      </div>
      <Button extraClassName={styles.btn} onClick={handleClose}>
        Confirm
      </Button>
    </Popup>
  );
};
