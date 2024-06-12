import type { FC } from 'react';
import { BlockChat, DeleteChat, UnblockChat } from '@features/chat/ui';
import { selectChatProfile } from '@entities/chat/model';
import { Preview } from '@entities/user/ui';
import { useAppSelector } from '@shared/lib/hooks';
import { Popup } from '@shared/ui';
import { ChatProfilePopupLazy } from './ChatProfilePopup.lazy';
import styles from './ChatProfilePopup.module.scss';

interface ChatProfilePopupProps {
  handleClose: () => void;
}

export const ChatProfilePopup: FC<ChatProfilePopupProps> = ({
  handleClose,
}) => {
  const { blocked, blockedById, chatMember } =
    useAppSelector(selectChatProfile);

  const currentUserId = useAppSelector((state) => state.user.currentUser!.id);

  return (
    <Popup closeHandler={handleClose} size="l" extraClassName={styles.popup}>
      {chatMember ? (
        <Preview
          user={chatMember}
          isFull
          extraContent={
            <div className={styles.btns}>
              {blocked ? (
                blockedById === currentUserId && <UnblockChat />
              ) : (
                <BlockChat />
              )}
              <DeleteChat handleClose={handleClose} />
            </div>
          }
        />
      ) : (
        <ChatProfilePopupLazy />
      )}
    </Popup>
  );
};
