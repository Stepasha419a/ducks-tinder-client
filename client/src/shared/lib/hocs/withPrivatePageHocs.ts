import { WithCheckedFields } from '@features/setting/lib';
import { WithAuthRedirect } from '@features/auth/lib';
import { WithChatConnection } from '@features/chat/lib';
import { compose } from '@shared/helpers';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithCheckedFields,
  WithChatConnection
);