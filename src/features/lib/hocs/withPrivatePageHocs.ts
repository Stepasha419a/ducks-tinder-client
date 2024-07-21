import { WithNewMessagesCount } from '@entities/chat';
import {
  WithCheckedFields,
  WithAuthRedirect,
  WithUserData,
} from '@entities/user';
import { compose } from '@shared/helpers';
import { WithErrorFallback } from '@shared/lib/hocs';
import { WithChatConnection } from './WithChatConnection';

export const withPrivatePageHocs = compose(
  WithAuthRedirect,
  WithUserData,
  WithCheckedFields,
  WithChatConnection,
  WithNewMessagesCount,
  (Component) => WithErrorFallback(Component, { redirect: true })
);
