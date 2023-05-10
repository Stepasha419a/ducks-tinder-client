import { partnerSettingsDefault, picturesDefault } from '../../users.constants';
import { IUserDto } from '../../users.interface';

export const userStub = (): IUserDto => ({
  id: 'sdfhsdghj34259034578923',
  email: '123@mail.ru',
  name: 'stepa',
  description: '',
  isActivated: false,
  age: 18,
  sex: 'male',
  nickname: '',
  interests: [],
  partnerSettings: partnerSettingsDefault,
  pictures: picturesDefault,
  chats: [],
  pairs: [],
  checkedUsers: [],
});
