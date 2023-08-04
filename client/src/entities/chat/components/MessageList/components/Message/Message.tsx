import type { ReactNode } from 'react';
import {
  Body,
  Content,
  MessageAvatar,
  Reply,
  Select,
  Text,
  Username,
} from './components';
import './Message.scss';

interface MessageProps {
  children: ReactNode;
}

export const Message = ({ children }: MessageProps) => {
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
