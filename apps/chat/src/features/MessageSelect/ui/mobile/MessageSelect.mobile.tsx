import type { FC } from 'react';
import {
  faPen,
  faReply,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from './MessageSelect.mobile.module.scss';

interface MessageSelectMobileProps {
  handleSelectClickOutside: () => void;
  handleDeleteMessage: () => void;
  handleEditMessage: () => void;
  handleRepliedMessage: () => void;
  isMessageEditable: boolean;
  isMessageDeleting: boolean;
}

export const MessageSelectMobile: FC<MessageSelectMobileProps> = ({
  handleSelectClickOutside,
  handleDeleteMessage,
  handleEditMessage,
  handleRepliedMessage,
  isMessageEditable,
  isMessageDeleting,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.closeWrapper}>
        <div onClick={handleSelectClickOutside}>
          <FontAwesomeIcon icon={faXmark} className={styles.icon} />
        </div>
        <div className={styles.selected}>1</div>
      </div>
      <div className={styles.featuresWrapper}>
        {isMessageDeleting && (
          <div onClick={handleDeleteMessage}>
            <FontAwesomeIcon icon={faTrash} className={styles.icon} />
          </div>
        )}
        {isMessageEditable && (
          <div onClick={handleEditMessage}>
            <FontAwesomeIcon icon={faPen} className={styles.icon} />
          </div>
        )}
        <div onClick={handleRepliedMessage}>
          <FontAwesomeIcon icon={faReply} className={styles.icon} />
        </div>
      </div>
    </div>
  );
};
