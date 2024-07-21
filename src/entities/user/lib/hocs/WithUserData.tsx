import type { ComponentType, FC } from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@hooks';
import { getCurrentUser } from '@entities/user';

export const WithUserData = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    const dispatch = useAppDispatch();

    const user = useAppSelector((state) => state.user.currentUser);
    const [requested, setRequested] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (user === null && !requested) {
        dispatch(getCurrentUser());
        setRequested(true);

        if (count < 3) {
          setTimeout(() => {
            setRequested(false);
            setCount((prev) => prev + 1);
          }, 2000);
        } else {
          toast('Something went wrong during the initial check.');
        }
      }
    }, [dispatch, requested, user, count]);

    if (user) return <Component {...props} />;

    return null;
  };

  return Wrapper;
};
