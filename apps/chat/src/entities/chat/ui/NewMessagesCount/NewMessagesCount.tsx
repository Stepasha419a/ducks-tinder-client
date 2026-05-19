import { useChatSelector } from '@shared/lib/hooks';
import * as styles from './NewMessagesCount.module.scss';
import type { FC } from 'react';

export const NewMessagesCount: FC = () => {
  const newMessageChatsCount = useChatSelector(
    (state) => state.chat.newMessagesCount
  );

  const isLoadedNewMessagesCount = newMessageChatsCount !== null;
  const isNewMessages = isLoadedNewMessagesCount && newMessageChatsCount > 0;

  if (!isNewMessages) {
    return null;
  }

  return (
    <div className={styles.newMessages}>
      <div className={styles.count}>
        {newMessageChatsCount > 9 ? '9+' : newMessageChatsCount}
      </div>
    </div>
  );
};
