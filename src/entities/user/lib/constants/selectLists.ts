import { INTERESTS } from '@/shared/api/constant';
import type { ProfileSettingSelectNameEnum } from './profileSettingSelectName';
import {
  AlcoholAttitude,
  AttentionSign,
  ChildrenAttitude,
  Chronotype,
  CommunicationStyle,
  Education,
  FoodPreference,
  PersonalityType,
  Pet,
  SmokingAttitude,
  SocialNetworksActivity,
  TrainingAttitude,
  ZodiacSign,
} from '@/shared/api/interfaces';

export const SELECT_LISTS: Record<
  ProfileSettingSelectNameEnum,
  ReadonlyArray<string> | string[]
> = {
  interests: INTERESTS,
  attentionSign: Object.values(AttentionSign) as string[],
  childrenAttitude: Object.values(ChildrenAttitude) as string[],
  communicationStyle: Object.values(CommunicationStyle) as string[],
  education: Object.values(Education) as string[],
  personalityType: Object.values(PersonalityType) as string[],
  zodiacSign: Object.values(ZodiacSign) as string[],
  pet: Object.values(Pet) as string[],
  alcoholAttitude: Object.values(AlcoholAttitude) as string[],
  smokingAttitude: Object.values(SmokingAttitude) as string[],
  trainingAttitude: Object.values(TrainingAttitude) as string[],
  foodPreference: Object.values(FoodPreference) as string[],
  socialNetworksActivity: Object.values(SocialNetworksActivity) as string[],
  chronotype: Object.values(Chronotype) as string[],
};
