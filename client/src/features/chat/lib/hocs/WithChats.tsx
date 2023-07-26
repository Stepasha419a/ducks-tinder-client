import { getChatsThunk } from '@/entities/chat/model';
import { useAppDispatch } from '@/shared/lib/hooks';
import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';

export function WithChats<P extends object>(Component: FC<P>): FC<P> {
  const Wrapper = (props: P) => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const isChatsPage = /chat\/?.*/.test(pathname);
      if (!isChatsPage) {
        dispatch(getChatsThunk());
      }
    }, [dispatch, pathname]);

    return <Component {...props} />;
  };

  return Wrapper;
}
