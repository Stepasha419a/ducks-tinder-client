import type { NameObject, ShortUser } from '@/shared/api/interfaces';
import type { PreviewUser } from '../../model';

export function getMoreAboutMe(user: PreviewUser | ShortUser): NameObject[] {
  const arr = [
    user.attentionSign,
    user.zodiacSign,
    user.education,
    user.childrenAttitude,
    user.communicationStyle,
    user.personalityType,
  ].filter((item) => item !== null);
  return arr as NameObject[];
}
