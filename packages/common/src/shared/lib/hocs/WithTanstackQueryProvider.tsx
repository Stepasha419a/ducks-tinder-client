import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ComponentType } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export function WithTanstackQueryProvider<P extends object>(
  Component: ComponentType<P>
) {
  const Wrapper = (props: P) => {
    return (
      <QueryClientProvider client={queryClient}>
        <Component {...props} />
      </QueryClientProvider>
    );
  };

  return Wrapper;
}
