import type { FC, ReactElement } from 'react';
import { SettingsGroup } from '@entities/setting/components';
import {
  AgeSettingThumbnail,
  DescriptionSettingThumbnail,
  EmailSettingThumbnail,
  NameSettingThumbnail,
  SexSettingThumbnail,
} from '@features/setting';

export const Account: FC = (): ReactElement => {
  return (
    <SettingsGroup
      title="Account Settings"
      descr="Verified email address helps to protect your account"
    >
      <EmailSettingThumbnail />
      <NameSettingThumbnail />
      <DescriptionSettingThumbnail />
      <SexSettingThumbnail />
      <AgeSettingThumbnail />
    </SettingsGroup>
  );
};
