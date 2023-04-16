import type { FC, ReactElement } from 'react';
import { SettingsGroup } from '@entities/setting/components';
import {
  DistanceSettingThumbnail,
  InterestsSettingThumbnail,
  PartnerAgeSettingThumbnail,
  PlaceSettingThumbnail,
  PreferSexSettingThumbnail,
} from '@features/setting';

export const Find: FC = (): ReactElement => {
  return (
    <SettingsGroup
      title="Find Settings"
      descr="When the local profiles are over, you will be able to switch to the
    Global Mode for dating people from all over the world."
    >
      <InterestsSettingThumbnail />
      <PlaceSettingThumbnail />
      <DistanceSettingThumbnail />
      <PreferSexSettingThumbnail />
      <PartnerAgeSettingThumbnail />
    </SettingsGroup>
  );
};
