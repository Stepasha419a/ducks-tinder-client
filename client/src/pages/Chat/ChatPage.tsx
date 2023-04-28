import type { FC, ReactElement } from 'react';
import { Chat, Nav } from '@widgets';
import { withHocs } from '@hocs';
import styles from './ChatPage.module.scss';

const ChatPage: FC = (): ReactElement => {
  return (
    <div className={styles.main}>
      <Nav />
      <Chat />
    </div>
  );
};

export default withHocs(ChatPage);
