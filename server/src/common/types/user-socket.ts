import { User } from '@prisma/client';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

interface UserSocketRequest extends IncomingMessage {
  user: User;
}

export interface UserSocket extends Socket {
  request: UserSocketRequest;
}
