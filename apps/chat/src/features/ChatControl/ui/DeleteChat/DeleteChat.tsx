import type { FC } from 'react';

import { Button, useOpenModal } from '@ducks-tinder-client/ui';

import * as styles from './DeleteChat.module.scss';
import { useTranslation } from 'react-i18next';
import { useChatDispatch } from '@shared/lib/hooks';
import type { ConfirmDeleteChatResult } from './ui';
import { ConfirmDeleteChat } from './ui';
import { deleteChatThunk } from '@entities/chat';

interface DeleteChatProps {
  submitDelete?: () => void;
}

export const DeleteChat: FC<DeleteChatProps> = ({ submitDelete }) => {
  const { t } = useTranslation('chat');

  const { openModal } = useOpenModal();

  const dispatch = useChatDispatch();

  const handleDeleteChat = async () => {
    const confirmed = await openModal<never, ConfirmDeleteChatResult>({
      Component: ConfirmDeleteChat,
    });

    if (!confirmed) {
      return;
    }

    dispatch(deleteChatThunk());
    submitDelete?.();
  };

  return (
    <>
      <Button onClick={handleDeleteChat} extraClassName={styles.btn}>
        {t('delete')}
      </Button>
    </>
  );
};
