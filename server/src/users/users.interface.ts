/* type SexType = 'male' | 'female' | null; */

export interface PictureInterface {
  name: string;
  order: number;
}

export interface PairsReturn {
  id: string;
  name: string;
  age: number;
  description: string;
  distance: number;
  interests: [];
  pictures: PictureInterface[];
}

export interface UserToInterestsRelation {
  interest: {
    id: string;
    name: string;
  };
}

/* export interface ReturnUser {
  id?: string;
  email: string;
  name: string;
  description: string;
  nickname: string;
  isActivated: boolean;
  age: number;
  sex: SexType;
  interests: string[];
  place: string;
  distance: number;
  usersOnlyInDistance: boolean;
  preferSex: SexType;
  preferAgeFrom: number;
  preferAgeTo: number;
  pictures: PictureInterface[];
} */

export interface IUserPassDto {
  id: string;
  email: string;
}
