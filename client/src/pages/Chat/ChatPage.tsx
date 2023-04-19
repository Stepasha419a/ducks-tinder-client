import type { ReactElement } from 'react';
import { Chat, Nav } from '@widgets';
import styles from './ChatPage.module.scss';

export const ChatPage = (): ReactElement => {
  return (
    <div className={styles.main}>
      <Nav />
      <Chat />
    </div>
  );
};
