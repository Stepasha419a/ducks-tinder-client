import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';
import { getChatsThunk } from '@entities/chat/model';
import { getIsActiveChatPage, getIsChatPage } from '@entities/chat/lib';
import { useAppDispatch, useMediaQuery } from '@shared/lib/hooks';

export function WithChats<P extends object>(Component: FC<P>): FC<P> {
  const Wrapper = (props: P) => {
    const { pathname } = useLocation();
    const isMobile = useMediaQuery('(max-width: 900px)');

    const dispatch = useAppDispatch();

    useEffect(() => {
      if (getIsValid(pathname, isMobile)) {
        dispatch(getChatsThunk());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Component {...props} />;
  };

  return Wrapper;
}

function getIsValid(pathname: string, isMobile: boolean): boolean {
  const isChatPage = getIsChatPage(pathname);
  const isActiveChatPage = getIsActiveChatPage(pathname);

  return !isChatPage || (isMobile && isActiveChatPage);
}
