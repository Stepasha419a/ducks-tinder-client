import { Observable } from 'rxjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetNewMessagesQuery } from './get-new-messages.query';
import { NewMessage } from 'chats/chats.interface';

@QueryHandler(GetNewMessagesQuery)
export class GetNewMessagesQueryHandler
  implements IQueryHandler<GetNewMessagesQuery>
{
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async execute(query: GetNewMessagesQuery): Promise<Observable<NewMessage[]>> {
    const { user, activeChatId } = query;

    const newMessages: NewMessage[] = [];

    this.eventEmitter.on('new-message', ({ message, chatId, userIds }) => {
      if (userIds.includes(user.id) && chatId !== activeChatId) {
        newMessages.push({ message, chatId });
      }
    });

    return new Observable((observer) => {
      observer.next(newMessages);
      setTimeout(() => {
        observer.complete();
      }, 5000);
    });
  }
}
