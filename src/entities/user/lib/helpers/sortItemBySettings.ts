import type { ShortUser } from '@shared/api/interfaces';
import type { PairSorts, PairSortsKey } from '../../model/pair';

export function sortItemBySettings(
  item: ShortUser,
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
  item: ShortUser,
  sortKey: PairSortsKey,
  sortSettings: PairSorts
): boolean {
  switch (sortKey) {
    case 'distance':
      if (
        item.distance &&
        item.distance > sortSettings.distance &&
        sortSettings.distance !== 100
      ) {
        return false;
      }
      return true;
    case 'age':
      if (
        item.age &&
        (item.age < sortSettings.age.from || item.age > sortSettings.age.to)
      ) {
        return false;
      }
      return true;
    case 'photos':
      if (
        sortSettings.photos !== 1 &&
        item.pictures.length < sortSettings.photos
      ) {
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
        if (!item.interests.some((i) => i === interest)) {
          return false;
        }
      }
      return true;
    default:
      return false;
  }
}
