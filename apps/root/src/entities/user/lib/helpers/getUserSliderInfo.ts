import type { ShortPlace, ShortUser, User } from '@ducks-tinder-client/common';
import { getLifestyle } from './getLifestyle';
import { getMoreAboutMe } from './getMoreAboutMe';

export interface UserInfo {
  name: string;
  age: number;
}

export interface UserPlaceInfo extends UserInfo {
  place: ShortPlace | null;
  distance: number;
}

type UserListInfo = string[];

type UserDescription = string;

export type UserSliderInfo =
  | UserInfo
  | UserPlaceInfo
  | UserListInfo
  | UserDescription
  | undefined;

export function getUserSliderInfo(user: User | ShortUser): UserSliderInfo[] {
  const result: UserSliderInfo[] = [];

  if (user.description) {
    result.push(user.description);
  }

  result.push({
    name: user.name,
    age: user.age!,
    distance: user.distance!,
    place: user.place as ShortPlace,
  } as UserPlaceInfo);

  const lifestyle = getLifestyle(user);
  if (lifestyle.length > 0) {
    result.push(lifestyle.slice(0, 4) as UserListInfo);
  }

  const moreAboutMe = getMoreAboutMe(user);
  if (moreAboutMe.length > 0) {
    result.push(moreAboutMe.slice(0, 4) as UserListInfo);
  }

  result.push({ name: user.name, age: user.age! } as UserInfo);

  return result;
}
