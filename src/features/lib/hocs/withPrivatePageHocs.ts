import { WithNewMessagesCount, WithChatConnection } from '@entities/chat';
import { WithCheckedFields, WithAuthRedirect } from '@entities/user';
import { compose } from '@shared/helpers';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount
);
