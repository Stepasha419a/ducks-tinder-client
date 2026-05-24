import { useAuthStore } from '@entities/user';
import { useMutation } from '@tanstack/react-query';
import { AuthQueryKey } from './keys';
import { getAuthService } from '@shared/api';
import { useUserStore } from '@entities/user/model/user';

export function useLogoutMutation() {
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  return useMutation({
    mutationKey: [AuthQueryKey.AuthMutation],
    mutationFn: async () => {
      localStorage.removeItem('accessToken');

      setAuthData(null);
      setIsAuth(false);
      setCurrentUser(null);

      return getAuthService().logout();
    },
  });
}
