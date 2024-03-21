import {
  ALCOHOL_ATTITUDES,
  ATTENTION_SIGNS,
  CHILDREN_ATTITUDES,
  CHRONOTYPES,
  COMMUNICATION_STYLES,
  EDUCATIONS,
  FOOD_PREFERENCES,
  INTERESTS,
  PERSONAL_TYPES,
  PETS,
  SMOKING_ATTITUDES,
  SOCIAL_NETWORK_ACTIVITIES,
  TRAINING_ATTITUDES,
  ZODIAC_SIGNS,
} from '@/shared/api/constant';
import type { ProfileSettingSelectName } from '../../model/user';

export const SELECT_LISTS: Record<
  ProfileSettingSelectName,
  ReadonlyArray<string>
> = {
  interests: INTERESTS,
  attentionSign: ATTENTION_SIGNS,
  childrenAttitude: CHILDREN_ATTITUDES,
  communicationStyle: COMMUNICATION_STYLES,
  education: EDUCATIONS,
  personalityType: PERSONAL_TYPES,
  zodiacSign: ZODIAC_SIGNS,
  pet: PETS,
  alcoholAttitude: ALCOHOL_ATTITUDES,
  smokingAttitude: SMOKING_ATTITUDES,
  trainingAttitude: TRAINING_ATTITUDES,
  foodPreference: FOOD_PREFERENCES,
  socialNetworksActivity: SOCIAL_NETWORK_ACTIVITIES,
  chronotype: CHRONOTYPES,
};
