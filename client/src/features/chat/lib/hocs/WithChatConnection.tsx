import { connectChatsThunk } from '@/entities/chat/model';
import { useAppDispatch } from '@/shared/lib/hooks';
import { useEffect, type FC } from 'react';

export function WithChatConnection<P extends object>(Component: FC<P>): FC<P> {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(connectChatsThunk());
    }, [dispatch]);

    return <Component {...props} />;
  };

  return Wrapper;
}
