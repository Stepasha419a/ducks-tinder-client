import type { FC } from 'react';

import { BlockChat, DeleteChat } from './ui';
import styles from './ChatControl.module.scss';






interface ChatControlProps {
  submitDelete?: () => void;
}

export const ChatControl: FC<ChatControlProps> = ({ submitDelete }) => {
  return (
    <div className={styles.btns}>
      <BlockChat />
      <DeleteChat submitDelete={submitDelete} />
    </div>
  );
};
