import type { NameObject, ShortUser } from '@shared/api/interfaces';
import type { PreviewUser } from '../../model';

export function getLifestyle(user: PreviewUser | ShortUser): NameObject[] {
  const arr = [
    user.alcoholAttitude,
    user.chronotype,
    user.foodPreference,
    user.pet,
    user.smokingAttitude,
    user.socialNetworksActivity,
    user.trainingAttitude,
  ].filter((item) => item !== null);
  return arr as NameObject[];
}
