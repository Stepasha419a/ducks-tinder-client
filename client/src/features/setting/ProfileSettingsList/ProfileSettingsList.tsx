import {
  AttentionSignSettingThumbnail,
  ChildrenAttitudeSettingThumbnail,
  CommunicationStyleSettingThumbnail,
  EducationSettingThumbnail,
  InterestGroup,
  InterestsSettingThumbnail,
  MoreAboutMeGroup,
  PersonalityTypeSettingThumbnail,
  ZodiacSignSettingThumbnail,
} from './components';

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
    </>
  );
};
