import type { SettingProperties } from './setting.interfaces';

export const SETTING_LIST: Record<string, SettingProperties | null> = {
  email: {
    validation: { min: 0, max: 40, email: true },
  },
  name: {
    validation: { min: 2, max: 14 },
  },
  description: {
    validation: { min: 50, max: 400 },
  },
  sex: null,
  preferSex: {
    formName: 'Interested in',
  },
  nickname: {
    validation: { min: 6, max: 16 },
  },
};

// profile/edit
export const BUSY_ROUTES = ['edit', 'place'];

export const SETTING_INTERESTS_LIST = [
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
  'travelling',
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