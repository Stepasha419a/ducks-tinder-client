import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TokenDocument = Token & Document

@Schema()
export class Token {
  @Prop({type: mongoose.Types.ObjectId, ref: 'User', required: true})
  user

  @Prop({required: true})
  refreshToken: string
}

export const TokenSchema = SchemaFactory.createForClass(Token);