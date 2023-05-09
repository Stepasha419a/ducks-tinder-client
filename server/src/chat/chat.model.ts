import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Transform(({ value }) => value.toString())
  _id: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
