import type { Dispatch, FC, SetStateAction } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector, useOnClickOutside } from '@shared/lib/hooks';
import { getDatesHourDiff } from '@shared/helpers';
import { useMessageSelect } from '../../lib';
import { MessageSelectMobile } from './mobile/MessageSelect.mobile';
import styles from './MessageSelect.module.scss';
import type { Message } from '@shared/api/interfaces';

interface MessageSelectProps {
  isMobile?: boolean;
  setRepliedMessage: Dispatch<SetStateAction<Message | null>>;
  isMessageEditing: boolean;
  setIsMessageEditing: Dispatch<SetStateAction<boolean>>;
  selectedMessage: Message | null;
  handleNullSelectedMessage: () => void;
}

export const MessageSelect: FC<MessageSelectProps> = ({
  isMobile,
  setRepliedMessage,
  isMessageEditing,
  setIsMessageEditing,
  selectedMessage,
  handleNullSelectedMessage,
}) => {
  const selectRef = useRef<HTMLDivElement | null>(null);

  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);
  const isOwn = selectedMessage?.userId === currentUserId;

  const {
    handleSelectClickOutside,
    handleDeleteMessage,
    handleEditMessage,
    handleRepliedMessage,
  } = useMessageSelect(
    setRepliedMessage,
    isMessageEditing,
    setIsMessageEditing,
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
