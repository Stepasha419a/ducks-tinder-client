import { Button, ListItem, Popup } from '@shared/ui';

import styles from './InterestsListPopup.module.scss';
import type { Locale } from '@shared/model';
import { addModal, useLocaleContext, useModalProps } from '@shared/model';

export interface InterestsListPopupProps {
  interestsList: string[];
}

export const InterestsListPopup = () => {
  const { props, resolveModal } =
    useModalProps<InterestsListPopupProps>(InterestsListPopup);
  const { interestsList } = props;

  const locale = useLocaleContext();

  return (
    <Popup
      title={locale.interestsTitle}
      closeHandler={() => resolveModal(null)}
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
      <Button extraClassName={styles.btn} onClick={() => resolveModal(null)}>
        {locale.close}
      </Button>
    </Popup>
  );
};

addModal(InterestsListPopup, 'InterestsListPopup');
