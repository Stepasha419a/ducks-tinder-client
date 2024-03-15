import { WithCheckedFields } from '@features/user/lib';
import { WithAuthRedirect } from '@features/user/lib';
import { WithChatConnection, WithChats } from '@features/chat/lib';
import { compose } from '@shared/helpers';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithCheckedFields,
  WithChats,
  WithChatConnection
);
