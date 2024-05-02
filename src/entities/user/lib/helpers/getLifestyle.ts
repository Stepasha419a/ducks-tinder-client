import type { ShortUser, User } from '@shared/api/interfaces';

export function getLifestyle(user: User | ShortUser): string[] {
  const arr = [
    user.alcoholAttitude,
    user.chronotype,
    user.foodPreference,
    user.pet,
    user.smokingAttitude,
    user.socialNetworksActivity,
    user.trainingAttitude,
  ].filter((item) => item !== null);
  return arr as unknown as string[];
}
