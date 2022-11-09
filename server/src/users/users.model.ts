import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { partnerSettingsDefault, picturesDefault } from './users.constants';
import { IPartnerSettings, picturesInterface } from './users.interface';

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop({required: true, unique: true})
  email: string

  @Prop({required: true})
  password: string

  @Prop({required: true})
  name: string

  @Prop({default: ''})
  description: string

  @Prop()
  nickname: string

  @Prop()
  picture: string

  @Prop({default: false})
  isActivated: boolean

  @Prop()
  activationLink: string

  @Prop({default: 18})
  age: number

  @Prop({default: 'male'})
  sex: 'male' | 'female'

  @Prop({default: []})
  interests: string[]

  @Prop({type: {} as IPartnerSettings, default: partnerSettingsDefault})
  partnerSettings

  @Prop({type: {} as picturesInterface, default: picturesDefault})
  pictures

  @Prop({default: []})
  chats: string[]

  @Prop({default: []})
  pairs: string[]

  @Prop({default: []})
  checkedUsers: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);