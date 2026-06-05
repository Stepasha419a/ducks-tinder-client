import type { Dispatch, FC, SetStateAction } from 'react';
import { useLayoutEffect, useRef, useState } from 'react';
import { faPen, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import {
  getDatesHourDiff,
  useOnClickOutside,
} from '@ducks-tinder-client/common';

import { useMessageSelect } from './lib';
import { MessageSelectMobile } from './ui';
import * as styles from './MessageSelect.module.scss';
import { useTranslation } from 'react-i18next';
import type { Message } from '@shared/api';
import { useUserStore } from '@ducks-tinder-client/auth';

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
  const userId = useUserStore((state) => state.currentUser?.id);

  const { t } = useTranslation('chat');

  const selectRef = useRef<HTMLDivElement | null>(null);

  const isOwn = Boolean(userId) && selectedMessage?.userId === userId;

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

  if (!selectedMessage) {
    return null;
  }

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

  const cn = classNames(styles.select, isOwn && styles.own);

  return (
    <div ref={selectRef} className={cn} style={{ top: position }}>
      <div onClick={handleRepliedMessage} className={styles.item}>
        <p>{t('reply')}</p>
        <FontAwesomeIcon className={styles.icon} icon={faReply} />
      </div>
      {isMessageEditable && (
        <div onClick={handleEditMessage} className={styles.item}>
          <p>{t('edit')}</p>
          <FontAwesomeIcon className={styles.icon} icon={faPen} />
        </div>
      )}
      {isMessageDeleting && (
        <div
          onClick={handleDeleteMessage}
          className={classNames(styles.item, styles.remove)}
        >
          <p>{t('remove')}</p>
          <FontAwesomeIcon className={styles.icon} icon={faTrash} />
        </div>
      )}
    </div>
  );
};
