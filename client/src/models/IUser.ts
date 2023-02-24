export interface ImageInterface {
  id: number;
  order: number;
  image: string;
  setting: string;
}

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

export interface PreferAge {
  min: number;
  max: number;
}

export interface IQuerySorts {
  distance: number;
  onlyNear: boolean;
  age: number;
  preferAge: PreferAge;
  sex: 'male' | 'female';
  preferSex: 'male' | 'female';
  userIds?: string[];
}

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
