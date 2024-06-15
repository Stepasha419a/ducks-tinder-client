import type { ReactNode } from 'react';
import { useMediaQuery } from '@shared/lib/hooks';
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
  handleSelectMessage: () => void;
}

export const Message = ({ children, handleSelectMessage }: MessageProps) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  if (isMobile) {
    return (
      <MessageMobile handleSelectMessage={handleSelectMessage}>
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

Message.Avatar = MessageAvatar;
Message.Content = Content;
Message.Username = Username;
Message.Reply = Reply;
Message.Text = Text;
Message.Select = Select;
Message.Body = Body;
