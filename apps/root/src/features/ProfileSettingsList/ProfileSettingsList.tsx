import {
  AlcoholAttitudeSettingThumbnail,
  AttentionSignSettingThumbnail,
  ChildrenAttitudeSettingThumbnail,
  ChronotypeSettingThumbnail,
  CommunicationStyleSettingThumbnail,
  EducationSettingThumbnail,
  FoodPreferenceSettingThumbnail,
  InterestGroup,
  InterestsSettingThumbnail,
  LifestyleGroup,
  MoreAboutMeGroup,
  PersonalityTypeSettingThumbnail,
  PetSettingThumbnail,
  SmokingAttitudeSettingThumbnail,
  SocialNetworksActivitySettingThumbnail,
  TrainingAttitudeSettingThumbnail,
  ZodiacSignSettingThumbnail,
} from './ui';

export const ProfileSettingsList = () => {
  return (
    <>
      <InterestGroup>
        <InterestsSettingThumbnail />
      </InterestGroup>
      <MoreAboutMeGroup>
        <ZodiacSignSettingThumbnail />
        <EducationSettingThumbnail />
        <ChildrenAttitudeSettingThumbnail />
        <PersonalityTypeSettingThumbnail />
        <CommunicationStyleSettingThumbnail />
        <AttentionSignSettingThumbnail />
      </MoreAboutMeGroup>
      <LifestyleGroup>
        <PetSettingThumbnail />
        <AlcoholAttitudeSettingThumbnail />
        <SmokingAttitudeSettingThumbnail />
        <TrainingAttitudeSettingThumbnail />
        <FoodPreferenceSettingThumbnail />
        <SocialNetworksActivitySettingThumbnail />
        <ChronotypeSettingThumbnail />
      </LifestyleGroup>
    </>
  );
};
