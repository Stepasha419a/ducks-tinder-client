import { useAppSelector } from '@hooks';
import { LoadingPage } from '@shared/ui';

export const InitialLoading = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  return <LoadingPage visible={isAuth === null} />;
};
