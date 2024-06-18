import { WithNewMessagesCount } from '@entities/chat';
import { WithCheckedFields, WithAuthRedirect } from '@entities/user';
import { compose } from '@shared/helpers';
import { WithErrorFallback } from '@shared/lib/hocs';
import { WithChatConnection } from './WithChatConnection';

export const withPrivatePageHocs = compose(
  WithNewMessagesCount,
  WithChatConnection,
  WithCheckedFields,
  WithAuthRedirect,
  (Component) => WithErrorFallback(Component, { redirect: true })
);
