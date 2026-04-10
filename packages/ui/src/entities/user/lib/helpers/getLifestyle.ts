import type { ShortUser, User } from '@ducks-tinder-client/common';
import type { Locale } from '@shared/model';

export function getLifestyle(user: User | ShortUser, locale: Locale): string[] {
  const arr = [
    user.alcoholAttitude ? locale.alcoholAttitude[user.alcoholAttitude] : null,
    user.chronotype ? locale.chronotype[user.chronotype] : null,
    user.foodPreference ? locale.foodPreference[user.foodPreference] : null,
    user.pet ? locale.pet[user.pet] : null,
    user.smokingAttitude ? locale.smokingAttitude[user.smokingAttitude] : null,
    user.socialNetworksActivity
      ? locale.socialNetworksActivity[user.socialNetworksActivity]
      : null,
    user.trainingAttitude
      ? locale.trainingAttitude[user.trainingAttitude]
      : null,
  ].filter((item) => item !== null);
  return arr as unknown as string[];
}
