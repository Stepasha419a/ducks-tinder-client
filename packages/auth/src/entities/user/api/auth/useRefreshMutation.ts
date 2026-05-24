import { useAuthStore } from '@entities/user';
import { useMutation } from '@tanstack/react-query';
import { AuthQueryKey } from './keys';
import { getAuthService } from '@shared/api';

export function useRefreshMutation() {
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  return useMutation({
    mutationKey: [AuthQueryKey.AuthMutation],
    mutationFn: async () => {
      return getAuthService().refresh();
    },
    onError: () => {
      setAuthData(null);
      setIsAuth(false);
    },
    onSuccess: (response) => {
      const { accessToken, ...data } = response.data;
      localStorage.setItem('accessToken', accessToken);

      setAuthData(data);
      setIsAuth(true);
    },
  });
}
