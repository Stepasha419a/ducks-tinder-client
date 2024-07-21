import { useAppSelector } from '@hooks';
import { LoadingPage } from '@shared/ui';

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
