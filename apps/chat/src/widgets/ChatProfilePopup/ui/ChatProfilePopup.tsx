import type { FC } from 'react';

import { useAppSelector } from '@ducks-tinder-client/common';
import { Popup, Preview } from '@ducks-tinder-client/ui';

import { ChatControl } from '@features/ChatControl';

import { ChatProfilePopupLazy } from './ChatProfilePopup.lazy';
import * as styles from './ChatProfilePopup.module.scss';

interface ChatProfilePopupProps {
  handleClose: () => void;
}

export const ChatProfilePopup: FC<ChatProfilePopupProps> = ({
  handleClose,
}) => {
  const chatMember = useAppSelector((state) => state.chat.chatMember);

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
