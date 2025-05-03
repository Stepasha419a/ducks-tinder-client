import { useAppSelector } from '@ducks-tinder-client/common';
import { LoadingPage } from '@ducks-tinder-client/ui';

export const InitialLoading = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  return (
    <LoadingPage
      visible={
        (isAuth === null && currentUser === null) ||
        (isAuth === true && currentUser === null)
      }
    />
  );
};
