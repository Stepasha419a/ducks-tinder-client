import {
  getDatesHourDiff,
  useOnClickOutside,
} from '@ducks-tinder-client/common';
import type { Message } from '@ducks-tinder-client/common';
import { faPen, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useLayoutEffect, useState } from 'react';
import { useRef } from 'react';
import { useAppSelector } from '@shared/lib';
import { useMessageSelect } from './lib';
import styles from './MessageSelect.module.scss';
import { MessageSelectMobile } from './ui';

interface MessageSelectProps {
  isMobile?: boolean;
  setRepliedMessage: Dispatch<SetStateAction<Message | null>>;
  editingMessage: Message | null;
  setEditingMessage: Dispatch<SetStateAction<Message | null>>;
  selectedMessage: Message | null;
  handleNullSelectedMessage: () => void;
}

export const MessageSelect: FC<MessageSelectProps> = ({
  isMobile,
  setRepliedMessage,
  editingMessage,
  setEditingMessage,
  selectedMessage,
  handleNullSelectedMessage,
}) => {
  const selectRef = useRef<HTMLDivElement | null>(null);

  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);
  const isOwn = selectedMessage?.userId === currentUserId;

  const [position, setPosition] = useState(0);

  const {
    handleSelectClickOutside,
    handleDeleteMessage,
    handleEditMessage,
    handleRepliedMessage,
  } = useMessageSelect(
    setRepliedMessage,
    editingMessage,
    setEditingMessage,
    selectedMessage,
    handleNullSelectedMessage
  );

  useOnClickOutside(selectRef, handleSelectClickOutside);

  const isMessageEditable =
    isOwn &&
    getDatesHourDiff(new Date(), new Date(selectedMessage.createdAt)) < 6;
  const isMessageDeleting =
    isOwn &&
    getDatesHourDiff(new Date(), new Date(selectedMessage.createdAt)) < 12;

  useLayoutEffect(() => {
    if (selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const chatProfileHeight = 60;

      if (rect.y > window.innerHeight - chatProfileHeight - rect.height) {
        const minimalMessageHeight = 34;
        setPosition((rect.height - minimalMessageHeight) * -1);
      }
    }
  }, []);

  if (isMobile) {
    return (
      <MessageSelectMobile
        handleSelectClickOutside={handleSelectClickOutside}
        handleDeleteMessage={handleDeleteMessage}
        handleEditMessage={handleEditMessage}
        handleRepliedMessage={handleRepliedMessage}
        isMessageEditable={isMessageEditable}
        isMessageDeleting={isMessageDeleting}
      />
    );
  }

  const cn = classNames(styles.select, isOwn && styles.own);

  return (
    <div ref={selectRef} className={cn} style={{ top: position }}>
      <div onClick={handleRepliedMessage} className={styles.item}>
        <p>Reply</p>
        <FontAwesomeIcon className={styles.icon} icon={faReply} />
      </div>
      {isMessageEditable && (
        <div onClick={handleEditMessage} className={styles.item}>
          <p>Edit</p>
          <FontAwesomeIcon className={styles.icon} icon={faPen} />
        </div>
      )}
      {isMessageDeleting && (
        <div
          onClick={handleDeleteMessage}
          className={classNames(styles.item, styles.remove)}
        >
          <p>Remove</p>
          <FontAwesomeIcon className={styles.icon} icon={faTrash} />
        </div>
      )}
    </div>
  );
};
