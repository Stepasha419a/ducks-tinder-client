import { picturesInterface } from '../users.interface';
import { IPartnerSettings } from '../users.interface';

export class UpdateUserDto {
  email?: string;
  name?: string;
  description?: string;
  nickname?: string;
  isActivated?: boolean;
  age?: number;
  sex?: string;
  interests?: string[];
  partnerSettings?: IPartnerSettings;
  pictures?: picturesInterface;
  chats?: string[];
}
