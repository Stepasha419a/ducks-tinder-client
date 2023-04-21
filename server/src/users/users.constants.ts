import { IPartnerSettings } from './users.interface';

export const partnerSettingsDefault: IPartnerSettings = {
  place: '',
  distance: 2,
  usersOnlyInDistance: false,
  preferSex: 'female',
  age: { from: 18, to: 20 },
};

export const picturesDefault = {
  avatar: '',
  gallery: [],
};
