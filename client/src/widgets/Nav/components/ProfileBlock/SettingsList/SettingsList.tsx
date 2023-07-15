import type { ReactElement } from 'react';
import {
  AgeSettingThumbnail,
  DescriptionSettingThumbnail,
  DistanceSettingThumbnail,
  EmailSettingThumbnail,
  InterestsSettingThumbnail,
  LogoutButton,
  NameSettingThumbnail,
  NicknameSettingThumbnail,
  PartnerAgeSettingThumbnail,
  PlaceSettingThumbnail,
  PreferSexSettingThumbnail,
  SexSettingThumbnail,
} from '@features/setting';
import { SwitchTheme } from '@/features/theme';
import { LinkThumbnail, SettingsGroup } from '@entities/setting/components';
import {
  AccountGroup,
  FindGroup,
  LinksGroup,
  NicknameGroup,
} from './settingGroups';
import styles from './SettingsList.module.scss';

export const SettingsList = (): ReactElement => {
  return (
    <div className={styles.groups}>
      <AccountGroup>
        <EmailSettingThumbnail />
        <NameSettingThumbnail />
        <DescriptionSettingThumbnail />
        <SexSettingThumbnail />
        <AgeSettingThumbnail />
        <SwitchTheme />
      </AccountGroup>
      <FindGroup>
        <InterestsSettingThumbnail />
        <PlaceSettingThumbnail />
        <DistanceSettingThumbnail />
        <PreferSexSettingThumbnail />
        <PartnerAgeSettingThumbnail />
      </FindGroup>
      <NicknameGroup>
        <NicknameSettingThumbnail />
      </NicknameGroup>
      <LinksGroup>
        <LinkThumbnail href="/policy" title="Community Rules" />
        <LinkThumbnail
          href="/policy"
          title="Security and Policy Development Center"
        />
        <LinkThumbnail href="/policy" title="Safety Tips" />
      </LinksGroup>
      <SettingsGroup>
        <LogoutButton />
      </SettingsGroup>
    </div>
  );
};
