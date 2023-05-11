export interface PictureInterface {
  name: string;
  order: number;
}

export interface ReturnPairs {
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

export interface IUserPassDto {
  id: string;
  email: string;
}
