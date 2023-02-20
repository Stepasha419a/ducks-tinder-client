import { imageInterface } from '../components/Profile/ProfileImageChange/ChangeImage/ChangeImage';
import { IUserInnerKey } from '../redux/settings/settings.slice';

export interface PartnerSettings {
  place: string;
  distance: number;
  usersOnlyInDistance: boolean;
  preferSex: 'male' | 'female';
  age: {
    from: number;
    to: number;
  };
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  description: string;
  nickname: string;
  age: number;
  sex: 'male' | 'female';
  isActivated: boolean;
  interests: string[];
  partnerSettings: PartnerSettings;
  pictures: {
    avatar: string;
    gallery: string[];
  };
  chats: string[];
  pairs: string[];
  checkedUsers: string[];
}

export interface IUserUnrequired {
  email?: string;
  name?: string;
  description?: string;
  nickname?: string;
  age?: number;
  sex?: 'male' | 'female';
  isActivated?: boolean;
  interests?: string[];
  pictures?: {
    avatar?: string;
    gallery?: string[];
  };
  partnerSettings?: {
    place?: string;
    distance?: number;
    usersOnlyInDistance?: boolean;
    preferSex?: 'male' | 'female';
    age?: {
      from?: number;
      to?: number;
    };
  };
  chats?: string[];
  checkedUsers?: string[];
}

export interface IQuerySorts {
  distance: number;
  onlyNear: boolean;
  age: number;
  preferAge: { min: number; max: number };
  sex: 'male' | 'female';
  preferSex: 'male' | 'female';
  userIds?: string[];
}

export const makeQuerySortsObj = (user: IUser, requestedUsers?: string[]) => {
  return {
    distance: user.partnerSettings.distance,
    onlyNear: user.partnerSettings.usersOnlyInDistance,
    age: user.age,
    preferAge: {
      min: user.partnerSettings.age.from,
      max: user.partnerSettings.age.to,
    },
    sex: user.sex,
    preferSex: user.partnerSettings.preferSex,
    userIds: requestedUsers
      ? requestedUsers
      : user.checkedUsers?.length
      ? user.checkedUsers
      : [],
  };
};

export const interestsList = [
  'fighting',
  'ski',
  'football',
  'volleyball',
  'tennis',
  'ping pong',
  'swimming',
  'karting',
  'horse ridding',
  'hunting',
  'fishing',
  'skateboarding',
  'bicycle',
  'running',
  'surfing',
  'snowboarding',
  'shooting',
  'parachuting',
  'paintball',
  'bowling',
  'billiard',
  'skates',
  'dancing',
  'cosplay',
  'ballet',
  'room quest',
  'fitness',
  'yoga',
  'meditation',
  'tourism',
  'traveling',
  'hiking',
  'camping',
  'cars',
  'education',
  'foreign languages',
  'cards',
  'poker',
  'chess',
  'checkers',
  'nard',
  'psychology',
  'table games',
  'sport',
  'blogging',
  'computer games',
  'programming',
  'drawing',
  '3D drawing',
  'gardener',
  'animals',
  'volunteering',
  'serials',
  'books',
  'movies',
  'cinema',
  'food',
  'cooking',
  'photo',
  'design',
  'writing',
  'music',
  'handmade',
];

export const potentialFields = [
  'description',
  'sex',
  'interests',
  'place',
  'distance',
  'preferSex',
];

export const makeDataObject = (args: {
  currentUser: IUser | any;
  inputName: string;
  changedData:
    | String
    | Number
    | Boolean
    | String[]
    | { from: number; to: number };
  innerObjectName?: IUserInnerKey;
}) => {
  const { currentUser, inputName, changedData, innerObjectName } = args;

  if (innerObjectName) {
    return {
      [innerObjectName]: {
        ...(currentUser[innerObjectName]),
        [inputName as keyof PartnerSettings]: changedData,
      },
    };
  }
  return { [inputName]: changedData };
};

export const makeUserImagesObject = (args: {
  currentUser: IUser;
  images: imageInterface[];
}) => {
  const { images } = args;
  const parsedImages = images.map((image) => image.image);

  return {
    pictures: { avatar: parsedImages[0], gallery: parsedImages.slice(1) },
  };
};
