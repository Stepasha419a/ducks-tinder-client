import { useEffect, type FC, type ReactElement } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Nav } from '@widgets';
import { withPrivatePageHocs } from '@hocs';
import styles from './ChatPage.module.scss';
import { Status } from './components';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { connectChatThunk, disconnectChatThunk } from '@/entities/chat/model';

const ChatPage: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const isLoading = useAppSelector((state) => state.chat.isLoading);
  const isConnected = useAppSelector((state) => state.chat.isConnected);

  // TODO: solve this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const params = useParams<'chatId'>() as { chatId: string | undefined };

  useEffect(() => {
    if (params.chatId && params.chatId !== currentChatId && !isLoading) {
      if (currentChatId) dispatch(disconnectChatThunk());
      dispatch(connectChatThunk({ chatId: params.chatId }));
    }
  }, [currentChatId, dispatch, isLoading, params.chatId]);

  return (
    <div className={styles.main}>
      <Nav />
      <div className={styles.content}>
        {isConnected ? <Outlet /> : <Status />}
      </div>
    </div>
  );
};

export default withPrivatePageHocs(ChatPage);
