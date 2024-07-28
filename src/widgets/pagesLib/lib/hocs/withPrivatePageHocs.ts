import {
  WithCheckedFields,
  WithAuthRedirect,
  WithUserData,
} from '@features/user';
import { WithChatConnection } from '@features/WithChatConnection';
import { WithNewMessagesCount } from '@entities/chat';
import { compose } from '@shared/lib';
import { WithErrorFallback } from '@shared/lib';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithUserData,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount,
  (Component) => WithErrorFallback(Component, { redirect: true })
);
