import { memo, type ReactNode } from 'react';
import type { Message as MessageInterface } from '@shared/api/interfaces';
import { useAdaptiveMediaQuery } from '@shared/lib/hooks';
import {
  Body,
  Content,
  MessageAvatar,
  Reply,
  Select,
  Text,
  Username,
  MessageMobile,
} from './ui';
import './Message.scss';

interface MessageProps {
  children: ReactNode;
  message: MessageInterface;
  selectedMessage: MessageInterface | null;
  handleSelectMessage: (message: MessageInterface) => void;
}

export const Message = ({
  children,
  handleSelectMessage,
  message,
}: MessageProps) => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return (
      <MessageMobile handleSelectMessage={() => handleSelectMessage(message)}>
        {children}
      </MessageMobile>
    );
  }

  return (
    <div className="wrapper">
      <div className="container">
        <span className="flex">{children}</span>
      </div>
    </div>
  );
};

export const MessageMemo = memo(Message, (prev, next) => {
  const isSelectedOrBlur =
    next.message.id !== next.selectedMessage?.id &&
    prev.selectedMessage === null;
  return (
    shallEqualExcept(prev, next, ['children', 'selectedMessage']) &&
    isSelectedOrBlur
  );
});

function shallEqualExcept<P extends object>(
  prev: P,
  next: P,
  except: string[]
) {
  for (const key in prev) {
    if (except.includes(key)) {
      continue;
    }

    if (prev[key] !== next[key]) {
      return false;
    }
  }

  return true;
}

Message.Avatar = MessageAvatar;
Message.Content = Content;
Message.Username = Username;
Message.Reply = Reply;
Message.Text = Text;
Message.Select = Select;
Message.Body = Body;
