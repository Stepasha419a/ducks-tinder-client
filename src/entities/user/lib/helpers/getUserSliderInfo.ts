import type { ShortPlace, ShortUser, User } from '@/shared/api/interfaces';
import { getLifestyle } from './getLifestyle';
import { getMoreAboutMe } from './getMoreAboutMe';

export interface UserInfo {
  name: string;
  age: number;
}

export interface UserPlaceInfo extends UserInfo {
  place: ShortPlace;
  distance: number;
}

type UserListInfo = string[];

type UserSliderInfo = UserInfo | UserPlaceInfo | UserListInfo;

export function getUserSliderInfo(user: User | ShortUser): UserSliderInfo[] {
  const result: UserSliderInfo[] = [];

  result.push({
    name: user.name,
    age: user.age!,
    distance: user.distance!,
    place: user.place as ShortPlace,
  } as UserPlaceInfo);

  const lifestyle = getLifestyle(user);
  if (lifestyle.length > 0) {
    result.push(lifestyle as UserListInfo);
  }

  const moreAboutMe = getMoreAboutMe(user);
  if (moreAboutMe.length > 0) {
    result.push(moreAboutMe as UserListInfo);
  }

  result.push({ name: user.name, age: user.age! } as UserInfo);

  return result;
}
