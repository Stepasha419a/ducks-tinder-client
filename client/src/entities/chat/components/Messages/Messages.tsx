import type { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import { useAppSelector } from '@hooks';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import { selectMessages } from '../../model';
import { MessagesLazy } from './Messages.lazy';
import styles from './Messages.module.scss';
import { useMessagesScroll } from '../../lib';
import { MessageList } from './MessageList/MessageList';
import classNames from 'classnames';

interface MessagesProps {
  select: ReactElement;
  currentMessage: MessageInterface | null;
  isMessageEditing: boolean;
  editingValue: string;
  setEditingValue: Dispatch<SetStateAction<string>>;
  handleSelectMessage: (message: MessageInterface) => void;
}

export const Messages: FC<MessagesProps> = (props): ReactElement => {
  const { messagesLength, isMessagesInitialLoading, maxMessagesCount } =
    useAppSelector(selectMessages);
  const repliedMessage = useAppSelector((state) => state.chat.repliedMessage);

  const { messagesRef, topScrollRef } = useMessagesScroll();

  if (isMessagesInitialLoading) {
    return (
      <div className={styles.messages}>
        <MessagesLazy />
      </div>
    );
  }

  const cn = classNames(styles.messages, repliedMessage && styles.replying);

  return (
    <div className={cn} ref={messagesRef}>
      <div className={styles.inner}>
        <div className={styles.loadMessages} ref={topScrollRef}></div>
        {maxMessagesCount > messagesLength && <MessagesLazy count={4} />}
        <MessageList {...props} />
      </div>
    </div>
  );
};
