import { LoadingPage } from '@ducks-tinder-client/ui';
import { useAuthStore } from '@entities/user/model';
import { useUserStore } from '@entities/user/model/user';

export const InitialLoading = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const currentUser = useUserStore((state) => state.currentUser);

  return (
    <LoadingPage
      visible={
        (isAuth === null && currentUser === null) ||
        (isAuth === true && currentUser === null)
      }
    />
  );
};
