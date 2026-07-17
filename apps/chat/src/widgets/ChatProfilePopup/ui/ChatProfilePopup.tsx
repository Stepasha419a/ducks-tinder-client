import {
  addModal,
  Popup,
  Preview,
  useModalProps,
} from '@ducks-tinder-client/ui';

import { ChatControl } from '@features/ChatControl';

import { ChatProfilePopupLazy } from './ChatProfilePopup.lazy';
import * as styles from './ChatProfilePopup.module.scss';
import { useChatDispatch, useChatSelector } from '@shared/lib/hooks';
import { nullMember } from '@entities/chat';
import { WithErrorFallback } from '@ducks-tinder-client/common';

export const ChatProfilePopup = WithErrorFallback(() => {
  const dispatch = useChatDispatch();

  const { resolveModal } = useModalProps(ChatProfilePopup);

  const chatMember = useChatSelector((state) => state.chat.chatMember);

  const handleClose = () => {
    dispatch(nullMember());
    resolveModal(null);
  };

  return (
    <Popup closeHandler={handleClose} size="l" extraClassName={styles.popup}>
      {chatMember ? (
        <Preview
          user={chatMember}
          isFull
          extraContent={<ChatControl submitDelete={handleClose} />}
        />
      ) : (
        <ChatProfilePopupLazy />
      )}
    </Popup>
  );
});

addModal(ChatProfilePopup, 'ChatProfilePopup');
