import { WithChatConnection } from '@features/chat';
import { WithCheckedFields } from '@features/user';
import { WithAuthRedirect } from '@features/user';
import { WithNewMessagesCount } from '@entities/chat';
import { compose } from '@shared/helpers';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount
);
