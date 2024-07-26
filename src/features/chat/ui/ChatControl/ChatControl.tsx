import type { FC } from 'react';
import styles from './ChatControl.module.scss';
import { BlockChat, DeleteChat } from './components';

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
