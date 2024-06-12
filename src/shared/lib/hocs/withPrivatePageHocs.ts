import { WithChatConnection } from '@features/chat/lib';
import { WithCheckedFields } from '@features/user/lib';
import { WithAuthRedirect } from '@features/user/lib';
import { WithNewMessagesCount } from '@entities/chat/lib';
import { compose } from '@shared/helpers';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount
);
