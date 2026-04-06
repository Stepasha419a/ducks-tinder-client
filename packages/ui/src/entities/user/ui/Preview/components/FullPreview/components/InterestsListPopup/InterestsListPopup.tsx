import type { FC } from 'react';

import { Button, ListItem, Popup } from '@shared/ui';

import styles from './InterestsListPopup.module.scss';
import type { Locale } from '@shared/model';
import { useLocaleContext } from '@shared/model';

interface InterestsListPopupProps {
  setIsInterestsListPopupOpen: (setting: boolean) => void;
  interestsList: string[];
}

export const InterestsListPopup: FC<InterestsListPopupProps> = ({
  interestsList,
  setIsInterestsListPopupOpen,
}) => {
  const locale = useLocaleContext();

  return (
    <Popup
      title={locale.interestsTitle}
      closeHandler={() => setIsInterestsListPopupOpen(false)}
    >
      <div className={styles.items}>
        {interestsList.map((item) => {
          return (
            <ListItem key={item}>
              {locale.interests[item as keyof Locale['interests']]}
            </ListItem>
          );
        })}
      </div>
      <Button
        extraClassName={styles.btn}
        onClick={() => setIsInterestsListPopupOpen(false)}
      >
        {locale.close}
      </Button>
    </Popup>
  );
};
