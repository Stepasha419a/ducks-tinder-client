export interface IPartnerSettings {
  place: string;
  distance: number;
  usersOnlyInDistance: boolean;
  preferSex: 'male' | 'female' | '';
  age: {
    from: number;
    to: number;
  };
}

export interface picturesInterface {
  avatar: string;
  gallery: string[];
}

export interface IUserDto {
  _id?: string;
  email: string;
  name: string;
  description: string;
  nickname: string;
  isActivated: boolean;
  age: number;
  sex: string;
  interests: string[];
  partnerSettings: IPartnerSettings;
  pictures: picturesInterface;
  chats: string[];
  pairs: string[];
  checkedUsers: string[];
}

export interface IUserPassDto {
  _id: string;
  email: string;
}
