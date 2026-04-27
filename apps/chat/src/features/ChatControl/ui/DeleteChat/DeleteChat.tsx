import type { FC } from 'react';
import { useState } from 'react';

import { deleteChatThunk, useAppDispatch } from '@ducks-tinder-client/common';
import { Button, Popup } from '@ducks-tinder-client/ui';

import * as styles from './DeleteChat.module.scss';
import { useTranslation } from 'react-i18next';

interface DeleteChatProps {
  submitDelete?: () => void;
}

export const DeleteChat: FC<DeleteChatProps> = ({ submitDelete }) => {
  const { t } = useTranslation('chat');

  const dispatch = useAppDispatch();

  const [isChatDeleting, setIsChatDeleting] = useState(false);

  const handleDelete = () => {
    dispatch(deleteChatThunk());
    submitDelete?.();
  };

  return (
    <>
      <Button
        onClick={() => setIsChatDeleting(true)}
        extraClassName={styles.btn}
      >
        {t('delete')}
      </Button>
      {isChatDeleting && (
        <Popup
          extraClassName={styles.overflow}
          closeHandler={() => setIsChatDeleting(false)}
          size="s"
        >
          <div className={styles.title}>{t('delete')}</div>
          <div className={styles.descr}>
            <div className={styles.text}>{t('sureWantToDelete')}</div>
            <div className={styles.attention}>{t('noRecover')}</div>
          </div>
          <div className={styles.wrapper}>
            <Button
              onClick={() => setIsChatDeleting(false)}
              extraClassName={styles.btn}
            >
              {t('cancel')}
            </Button>
            <Button onClick={handleDelete} extraClassName={styles.btn}>
              {t('delete')}
            </Button>
          </div>
        </Popup>
      )}
    </>
  );
};
