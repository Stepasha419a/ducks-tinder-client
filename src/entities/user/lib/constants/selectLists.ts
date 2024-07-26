import {
  AlcoholAttitude,
  AttentionSign,
  ChildrenAttitude,
  Chronotype,
  CommunicationStyle,
  Education,
  FoodPreference,
  Interest,
  PersonalityType,
  Pet,
  SmokingAttitude,
  SocialNetworksActivity,
  TrainingAttitude,
  ZodiacSign,
} from '@shared/api';
import type { ProfileSettingSelectNameEnum } from './profileSettingSelectName';

export const SELECT_LISTS: Record<ProfileSettingSelectNameEnum, string[]> = {
  interests: Object.values(Interest),
  attentionSign: Object.values(AttentionSign),
  childrenAttitude: Object.values(ChildrenAttitude),
  communicationStyle: Object.values(CommunicationStyle),
  education: Object.values(Education),
  personalityType: Object.values(PersonalityType),
  zodiacSign: Object.values(ZodiacSign),
  pet: Object.values(Pet),
  alcoholAttitude: Object.values(AlcoholAttitude),
  smokingAttitude: Object.values(SmokingAttitude),
  trainingAttitude: Object.values(TrainingAttitude),
  foodPreference: Object.values(FoodPreference),
  socialNetworksActivity: Object.values(SocialNetworksActivity),
  chronotype: Object.values(Chronotype),
};
