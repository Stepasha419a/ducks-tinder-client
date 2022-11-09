import { IMessage } from './chat.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ChatDocument = Chat & Document

@Schema()
export class Chat {
  @Prop({default:[]})
  messages: IMessage[]

  @Prop({required: true})
  members: string[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat);