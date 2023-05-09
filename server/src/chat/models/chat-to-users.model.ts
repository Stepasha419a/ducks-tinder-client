import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { User } from 'src/users/users.model';
import { Chat } from '../chat.model';

export type ChatToUsersDocument = ChatToUsers & Document;

@Schema()
export class ChatToUsers {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  @Type(() => User)
  user: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Chat.name,
  })
  @Type(() => Chat)
  chat: Chat;
}

export const ChatToUsersSchema = SchemaFactory.createForClass(ChatToUsers);
