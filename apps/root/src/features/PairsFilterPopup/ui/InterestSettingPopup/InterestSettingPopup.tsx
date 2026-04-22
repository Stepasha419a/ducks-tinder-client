import type { FC } from 'react';

import { Interest } from '@ducks-tinder-client/common';
import { Button, ListItemButton, Popup } from '@ducks-tinder-client/ui';

import * as styles from './InterestSettingPopup.module.scss';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Popup title={t('pairs.filter.interests.title')} closeHandler={handleClose}>
      <div className={styles.items}>
        {Object.values(Interest).map((selectItem) => {
          const isActive = activeItems.some((item) => selectItem === item);
          return (
            <ListItemButton
              onClick={() => toggleItem(selectItem)}
              isActive={isActive}
              key={selectItem}
            >
              {t(`user.interests.${selectItem}`)}
            </ListItemButton>
          );
        })}
      </div>
      <Button extraClassName={styles.btn} onClick={handleClose}>
        {t('pairs.filter.buttons.confirm')}
      </Button>
    </Popup>
  );
};
