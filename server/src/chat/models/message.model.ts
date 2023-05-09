import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from '../../users/users.model';
import { Chat } from '../chat.model';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true })
  content: string;

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
    ref: 'Chat',
  })
  @Type(() => Chat)
  chat: Chat;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
