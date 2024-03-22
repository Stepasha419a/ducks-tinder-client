import type { PartialUser } from '@/shared/api/services/user/user-service.interface';
import type { ProfileSettingSelectName } from '../../model/user';
import type { ProfileSettingNameEnum } from './profileSettingName';

// array as fields of user model like user.interests
export const SELECT_SETTING_FIELDS: Record<
  ProfileSettingNameEnum,
  ProfileSettingSelectName[] & PartialUser
> = {
  interests: ['interests'],
  moreAboutMe: [
    'zodiacSign',
    'education',
    'childrenAttitude',
    'personalityType',
    'communicationStyle',
    'attentionSign',
  ],
  lifestyle: [
    'pet',
    'alcoholAttitude',
    'smokingAttitude',
    'trainingAttitude',
    'foodPreference',
    'socialNetworksActivity',
    'chronotype',
  ],
};
