import type { ComponentType, FC } from 'react';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getCurrentUser } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/lib';

export const WithUserData = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.user.currentUser);
    const [requested, setRequested] = useState(false);
    const [count, setCount] = useState(0);
    const timeout = useRef(2000);

    const failedOnceWithToast = useRef(false);

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
          toast(
            'Something went wrong during the initial check. Trying to reconnect...'
          );
        }
      }

      if (user && failedOnceWithToast.current) {
        toast('Successful connection');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, requested, count]);

    if (user) return <Component {...props} />;

    return null;
  };

  return Wrapper;
};
