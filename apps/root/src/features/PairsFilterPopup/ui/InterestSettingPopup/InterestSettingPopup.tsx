import { Interest } from '@ducks-tinder-client/common';
import {
  addModal,
  Button,
  ListItemButton,
  Popup,
  useModalProps,
} from '@ducks-tinder-client/ui';

import * as styles from './InterestSettingPopup.module.scss';
import { useTranslation } from 'react-i18next';

export interface InterestSettingPopupProps {
  activeItems: string[];
  toggleItem: (item: string) => void;
}

export const InterestSettingPopup = () => {
  const { t } = useTranslation();

  const { props, resolveModal } =
    useModalProps<InterestSettingPopupProps>(InterestSettingPopup);
  const { activeItems: activeItems, toggleItem } = props;

  return (
    <Popup
      title={t('pairs.filter.interests.title')}
      closeHandler={() => resolveModal(null)}
    >
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
      <Button extraClassName={styles.btn} onClick={() => resolveModal(null)}>
        {t('pairs.filter.buttons.confirm')}
      </Button>
    </Popup>
  );
};

addModal(InterestSettingPopup, 'InterestSettingPopup');
