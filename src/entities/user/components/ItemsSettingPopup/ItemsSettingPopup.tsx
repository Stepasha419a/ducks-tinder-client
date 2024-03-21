import type { FC } from 'react';
import { Button, ListItem, Popup } from '@shared/ui';
import styles from './ItemsSettingPopup.module.scss';

interface ItemsSettingPopupProps {
  list: string[] | ReadonlyArray<string>;
  activeItems: string[];
  toggleItem: (item: string) => void;
  setIsItemsSettingPopupOpen: (setting: boolean) => void;
}

export const ItemsSettingPopup: FC<ItemsSettingPopupProps> = ({
  list,
  activeItems,
  toggleItem,
  setIsItemsSettingPopupOpen,
}) => {
  return (
    <Popup
      title="Interests"
      closeHandler={() => setIsItemsSettingPopupOpen(false)}
    >
      <div className={styles.items}>
        {list.map((selectItem) => {
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
      <Button
        extraClassName={styles.btn}
        onClick={() => setIsItemsSettingPopupOpen(false)}
      >
        Confirm
      </Button>
    </Popup>
  );
};
