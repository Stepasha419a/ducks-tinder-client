import { useQuery } from '@tanstack/react-query';
import { UserQueryKey } from './keys';
import { getUserGetMeEndpoint } from '@shared/api';
import { isAxiosError } from 'axios';
import { useAuthStore } from '@entities/user/model';

export function useGetCurrentUserQuery() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return useQuery({
    queryKey: [UserQueryKey.User],
    queryFn: async () => {
      return getUserGetMeEndpoint()();
    },
    select: (response) => response.data,
    retry: (failureCount, error: unknown) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        return false;
      }

      return failureCount < 3;
    },
    retryDelay: 2000,
    enabled: Boolean(isAuth),
  });
}
