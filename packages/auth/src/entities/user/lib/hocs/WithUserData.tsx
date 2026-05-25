import { COMMON_LIB_SETTINGS } from '@ducks-tinder-client/common';
import { useGetCurrentUserQuery } from '@entities/user';
import { useUserStore } from '@entities/user/model/user';
import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const WithUserData = <P extends object>(
  Component: ComponentType<P>
): FC<P> => {
  const Wrapper = (props: P) => {
    const { data, failureCount, isError, isLoading } = useGetCurrentUserQuery();
    const setCurrentUser = useUserStore((state) => state.setCurrentUser);

    useEffect(() => {
      setCurrentUser(data || null);
    }, [data, setCurrentUser]);

    useEffect(() => {
      if (isError && !data) {
        toast(COMMON_LIB_SETTINGS.TEXTS.reconnection);
      } else if (failureCount >= 1) {
        toast(COMMON_LIB_SETTINGS.TEXTS.successConnect);
      }
    }, [data, failureCount, isError, isLoading]);

    if (!isLoading && data) return <Component {...props} />;

    return null;
  };

  return Wrapper;
};
