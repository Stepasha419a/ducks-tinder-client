import { WithNewMessagesCount } from '@entities/chat';
import { WithInitialLoading, WithPairsInfo } from '@entities/user';
import { compose } from '@shared/lib';
import { WithErrorFallback } from '@shared/lib';
import { WithAuthRedirect } from './WithAuthRedirect';
import { WithChatConnection } from './WithChatConnection';
import { WithCheckedFields } from './WithCheckedFields';
import { WithUserData } from './WithUserData';

export const withPrivateHocs = compose(
  WithInitialLoading,
  WithAuthRedirect,
  WithUserData,
  WithCheckedFields,
  WithPairsInfo,
  WithChatConnection,
  WithNewMessagesCount,
  (Component) => WithErrorFallback(Component, { redirect: true })
);
