import type { ShortUser, User } from '@ducks-tinder-client/common';

export function getMoreAboutMe(user: User | ShortUser): string[] {
  const arr = [
    user.attentionSign,
    user.zodiacSign,
    user.education,
    user.childrenAttitude,
    user.communicationStyle,
    user.personalityType,
  ].filter((item) => item !== null);
  return arr as unknown as string[];
}
