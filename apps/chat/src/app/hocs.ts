import {
  APP_PRIVATE_HOC_COMPOSITION,
  HocCompositionStage,
} from '@ducks-tinder-client/common';
import { WithNewMessagesCount } from '@entities/chat';
import { WithChatConnection } from '@features/WithChatConnection';

APP_PRIVATE_HOC_COMPOSITION.addHocs(HocCompositionStage.DATA_SYNCING, [
  WithChatConnection,
  WithNewMessagesCount,
]);
