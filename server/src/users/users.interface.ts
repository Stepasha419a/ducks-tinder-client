export interface PictureInterface {
  name: string;
  order: number;
}

interface InterestInterface {
  name: string;
}

export interface ShortUser {
  id: string;
  name: string;
  age: number;
  description: string;
  distance: number;
  interests: InterestInterface[];
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
