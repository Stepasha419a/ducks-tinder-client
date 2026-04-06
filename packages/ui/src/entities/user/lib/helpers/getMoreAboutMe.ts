import type { ShortUser, User } from '@ducks-tinder-client/common';
import type { Locale } from '@shared/model';

export function getMoreAboutMe(
  user: User | ShortUser,
  locale: Locale
): string[] {
  console.log({ locale });
  const arr = [
    user.attentionSign ? locale.attentionSign[user.attentionSign] : null,
    user.zodiacSign ? locale.zodiacSign[user.zodiacSign] : null,
    user.education ? locale.education[user.education] : null,
    user.childrenAttitude
      ? locale.childrenAttitude[user.childrenAttitude]
      : null,
    user.communicationStyle
      ? locale.communicationStyle[user.communicationStyle]
      : null,
    user.personalityType ? locale.personalityType[user.personalityType] : null,
  ].filter((item) => item !== null);
  return arr as unknown as string[];
}
