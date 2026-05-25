import { useQuery } from '@tanstack/react-query';
import { UserQueryKey } from './keys';
import { serviceGetter } from '@ducks-tinder-client/common';

export function useGetCurrentUserQuery() {
  return useQuery({
    queryKey: [UserQueryKey.User],
    queryFn: async () => {
      return serviceGetter.getUserService().getMe();
    },
    select: (response) => response.data,
    retryDelay: 2000,
  });
}
