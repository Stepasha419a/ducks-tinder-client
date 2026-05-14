import type { ComponentType, FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { getCurrentUser } from '@entities/user';
import {
  COMMON_LIB_SETTINGS,
  useAppDispatch,
  useAppSelector,
} from '@shared/lib';
import { useAppContext } from '@shared/model';

export const WithUserData = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    const { setUserId } = useAppContext();
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.user.currentUser);
    const [requested, setRequested] = useState(false);
    const [count, setCount] = useState(0);
    const timeout = useRef(2000);

    const failedOnceWithToast = useRef(false);

    useEffect(() => {
      setUserId(user?.id || null);
    }, [user, setUserId]);

    useEffect(() => {
      if (user === null && !requested) {
        dispatch(getCurrentUser());
        setRequested(true);

        if (count < 3) {
          setTimeout(() => {
            setRequested(false);
            setCount((prev) => prev + 1);
          }, timeout.current);
        } else {
          setCount(0);
          setRequested(false);
          timeout.current *= 2;

          failedOnceWithToast.current = true;
          toast(COMMON_LIB_SETTINGS.TEXTS.reconnection);
        }
      }

      if (user && failedOnceWithToast.current) {
        toast(COMMON_LIB_SETTINGS.TEXTS.successConnect);
      }
    }, [dispatch, requested, count]);

    if (user) return <Component {...props} />;

    return null;
  };

  return Wrapper;
};
