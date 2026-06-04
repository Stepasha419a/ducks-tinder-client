import { Button } from '@ducks-tinder-client/ui';

import * as styles from './BlockChat.module.scss';
import { useTranslation } from 'react-i18next';
import { useChatDispatch, useChatSelector } from '@shared/lib/hooks';
import { blockChatThunk, unblockChatThunk } from '@entities/chat';
import { useUserStore } from '@ducks-tinder-client/auth';

export const BlockChat = () => {
  const userId = useUserStore((state) => state.currentUser?.id);

  const { t } = useTranslation('chat');

  const dispatch = useChatDispatch();

  const activeChat = useChatSelector((state) => state.chat.activeChat);

  if (!activeChat) {
    return null;
  }

  const isOwnBlocked = userId && activeChat.blockedById === userId;

  const handleClick = () => {
    if (isOwnBlocked) {
      dispatch(unblockChatThunk());
    } else if (!activeChat.blocked) {
      dispatch(blockChatThunk());
    }
  };

  if (activeChat.blocked && !isOwnBlocked) {
    return null;
  }

  return (
    <Button onClick={handleClick} extraClassName={styles.btn}>
      {activeChat.blocked ? t('unblock') : t('block')}
    </Button>
  );
};
