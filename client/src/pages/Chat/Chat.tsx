import { useAppSelector } from '../../hooks';
import { ChatForm, Messages, Status } from './components';

export const Chat = () => {
  const isConnected = useAppSelector((state) => state.chatPage.isConnected);

  return (
    <>
      <Status />
      {isConnected && (
        <>
          <Messages />
          <ChatForm />
        </>
      )}
    </>
  );
};
