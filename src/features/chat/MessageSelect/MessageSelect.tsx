import type { FC } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector, useOnClickOutside } from '@shared/lib/hooks';
import { getDatesHourDiff } from '@shared/helpers';
import { useMessageSelect } from '../lib';
import { MessageSelectMobile } from './mobile/MessageSelect.mobile';
import styles from './MessageSelect.module.scss';

interface MessageSelectProps {
  isMobile?: boolean;
}

export const MessageSelect: FC<MessageSelectProps> = ({ isMobile }) => {
  const currentMessage = useAppSelector((state) => state.chat.currentMessage);

  const selectRef = useRef<HTMLDivElement | null>(null);

  const currentUserId = useAppSelector((state) => state.user.currentUser.id);
  const isOwn = currentMessage?.userId === currentUserId;

  const {
    handleSelectClickOutside,
    handleDeleteMessage,
    handleEditMessage,
    handleRepliedMessage,
  } = useMessageSelect();

  useOnClickOutside(selectRef, handleSelectClickOutside);

  const isMessageEditable =
    isOwn &&
    getDatesHourDiff(new Date(), new Date(currentMessage.createdAt)) < 6;
  const isMessageDeleting =
    isOwn &&
    getDatesHourDiff(new Date(), new Date(currentMessage.createdAt)) < 12;

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

  return (
    <div ref={selectRef} className={styles.select}>
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