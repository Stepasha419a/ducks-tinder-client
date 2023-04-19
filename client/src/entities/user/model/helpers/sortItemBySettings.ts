import type {
  PairSorts,
  PairSortsKey,
  User,
} from '@shared/api/interfaces';

export function sortItemBySettings(
  item: User,
  sortSettings: PairSorts
): boolean {
  for (const sortKey in sortSettings) {
    const result = sortPair(item, sortKey as PairSortsKey, sortSettings);
    if (!result) {
      return false;
    }
  }
  return true;
}

function sortPair(
  item: User,
  sortKey: PairSortsKey,
  sortSettings: PairSorts
): boolean {
  switch (sortKey) {
    case 'distance':
      if (item.partnerSettings.distance > sortSettings.distance) {
        return false;
      }
      return true;
    case 'age':
      if (item.age < sortSettings.age.from || item.age > sortSettings.age.to) {
        return false;
      }
      return true;
    case 'photos':
      if (1 + item.pictures.gallery.length < sortSettings.photos) {
        return false;
      }
      return true;
    case 'account':
      for (const accountSetting of sortSettings.account) {
        if (accountSetting === 'have interests' && !item.interests.length) {
          return false;
        }
        if (accountSetting === 'identify confirmed' && !item.isActivated) {
          return false;
        }
      }
      return true;
    case 'interests':
      for (const interest of sortSettings.interests) {
        if (!item.interests.includes(interest)) {
          return false;
        }
      }
      return true;
    default:
      return false;
  }
}
