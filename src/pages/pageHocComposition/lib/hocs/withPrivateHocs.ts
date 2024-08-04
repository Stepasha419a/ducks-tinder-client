import { WithAuthRedirect } from '@features/WithAuthRedirect';
import { WithChatConnection } from '@features/WithChatConnection';
import { WithCheckedFields } from '@features/WithCheckedFields';
import { WithUserData } from '@features/WithUserData';
import { WithNewMessagesCount } from '@entities/chat';
import { WithInitialLoading } from '@entities/user';
import { compose } from '@shared/lib';
import { WithErrorFallback } from '@shared/lib';

export const withPrivateHocs = compose(
  WithInitialLoading,
  WithAuthRedirect,
  WithUserData,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount,
  (Component) => WithErrorFallback(Component, { redirect: true })
);
