import { useQuery } from '@tanstack/react-query';
import { UserQueryKey } from './keys';
import { getUserGetMeEndpoint } from '@shared/api';

export function useGetCurrentUserQuery() {
  return useQuery({
    queryKey: [UserQueryKey.User],
    queryFn: async () => {
      return getUserGetMeEndpoint()();
    },
    select: (response) => response.data,
    retryDelay: 2000,
  });
}
