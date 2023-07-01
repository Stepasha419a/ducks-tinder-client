import type { FC, ReactElement } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Nav } from '@widgets';
import { withPrivatePageHocs } from '@hocs';
import Choose from './components/Choose/Choose';
import styles from './ChatPage.module.scss';

const ChatPage: FC = (): ReactElement => {
  const params = useParams<'chatId'>() as { chatId: string | undefined };

  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.content}>
        {params.chatId ? <Outlet /> : <Choose />}
      </div>
    </div>
  );
};

export default withPrivatePageHocs(ChatPage);
