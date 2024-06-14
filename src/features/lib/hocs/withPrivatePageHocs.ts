import { WithNewMessagesCount } from '@entities/chat';
import { WithCheckedFields, WithAuthRedirect } from '@entities/user';
import { compose } from '@shared/helpers';
import { WithChatConnection } from './WithChatConnection';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount
);
