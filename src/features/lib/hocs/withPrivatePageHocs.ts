import { WithNewMessagesCount } from '@entities/chat';
import { WithCheckedFields, WithAuthRedirect } from '@entities/user';
import { compose } from '@shared/helpers';
import { WithErrorFallback } from '@shared/lib/hocs';
import { WithChatConnection } from './WithChatConnection';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithErrorFallback,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount
);
