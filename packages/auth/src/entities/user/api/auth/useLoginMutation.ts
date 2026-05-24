import { useAuthStore } from '@entities/user';
import { useMutation } from '@tanstack/react-query';
import { AuthQueryKey } from './keys';
import type { LoginParams } from '@shared/api';
import { getAuthService } from '@shared/api';
import { returnErrorMessage } from '@ducks-tinder-client/common';
import { toast } from 'react-toastify';

export function useLoginMutation() {
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  return useMutation({
    mutationKey: [AuthQueryKey.AuthMutation],
    mutationFn: async ({ email, password }: LoginParams) => {
      return getAuthService().login(email, password);
    },
    onError: (error: unknown) => {
      setAuthData(null);
      setIsAuth(false);

      // TODO: show 401 error with i18n keys mapping, fix prod 401 oauth response (overrides error message from auth-service)
      toast(returnErrorMessage(error), { autoClose: 15000 });
    },
    onSuccess: (response) => {
      const { accessToken, ...data } = response.data;
      localStorage.setItem('accessToken', accessToken);

      setAuthData(data);
      setIsAuth(true);
    },
  });
}
