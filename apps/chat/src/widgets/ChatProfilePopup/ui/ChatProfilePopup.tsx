import type { FC } from 'react';

import { Popup, Preview } from '@ducks-tinder-client/ui';

import { ChatControl } from '@features/ChatControl';

import { ChatProfilePopupLazy } from './ChatProfilePopup.lazy';
import * as styles from './ChatProfilePopup.module.scss';
import { useChatSelector } from '@shared/lib/hooks';

interface ChatProfilePopupProps {
  handleClose: () => void;
}

export const ChatProfilePopup: FC<ChatProfilePopupProps> = ({
  handleClose,
}) => {
  const chatMember = useChatSelector((state) => state.chat.chatMember);

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
};
