import { WithChatConnection } from '@features/chat';
import { WithNewMessagesCount } from '@entities/chat';
import {
  WithCheckedFields,
  WithAuthRedirect,
  WithUserData,
} from '@entities/user';
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
