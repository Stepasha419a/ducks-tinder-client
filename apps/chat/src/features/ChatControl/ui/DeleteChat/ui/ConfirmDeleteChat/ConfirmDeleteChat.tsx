import {
  addModal,
  Button,
  Popup,
  useModalProps,
} from '@ducks-tinder-client/ui';
import * as styles from './ConfirmDeleteChat.module.scss';
import { useTranslation } from 'react-i18next';

export type ConfirmDeleteChatResult = boolean;

export const ConfirmDeleteChat = () => {
  const { resolveModal } = useModalProps(ConfirmDeleteChat);

  const { t } = useTranslation('chat');

  const handleDelete = () => {
    resolveModal<ConfirmDeleteChatResult>(true);
  };

  return (
    <Popup
      extraClassName={styles.overflow}
      closeHandler={() => resolveModal<ConfirmDeleteChatResult>(false)}
      size="s"
    >
      <div className={styles.title}>{t('delete')}</div>
      <div className={styles.descr}>
        <div className={styles.text}>{t('sureWantToDelete')}</div>
        <div className={styles.attention}>{t('noRecover')}</div>
      </div>
      <div className={styles.wrapper}>
        <Button
          onClick={() => resolveModal<ConfirmDeleteChatResult>(false)}
          extraClassName={styles.btn}
        >
          {t('cancel')}
        </Button>
        <Button onClick={handleDelete} extraClassName={styles.btn}>
          {t('delete')}
        </Button>
      </div>
    </Popup>
  );
};

addModal(ConfirmDeleteChat, 'ConfirmDeleteChat');
