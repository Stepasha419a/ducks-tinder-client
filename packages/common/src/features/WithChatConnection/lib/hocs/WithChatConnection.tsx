import type { ComponentType, FC } from 'react';

import { useChatConnection } from '../hooks';

export function WithChatConnection<P extends object>(
  Component: ComponentType<P>
): FC<P> {
  const Wrapper = (props: P) => {
    useChatConnection();

    return <Component {...props} />;
  };

  return Wrapper;
}
