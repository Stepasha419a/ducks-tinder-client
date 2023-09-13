import type { ReactElement } from 'react';
import {
  AgeSettingThumbnail,
  DescriptionSettingThumbnail,
  DistanceSettingThumbnail,
  EmailSettingThumbnail,
  LogoutButton,
  NameSettingThumbnail,
  NicknameSettingThumbnail,
  PartnerAgeSettingThumbnail,
  PlaceSettingThumbnail,
  PreferSexSettingThumbnail,
  SexSettingThumbnail,
} from '@features/setting';
import { SwitchTheme } from '@features/theme';
import { LinkThumbnail, SettingsGroup } from '@entities/setting/components';
import {
  AccountGroup,
  FindGroup,
  LinksGroup,
  NicknameGroup,
} from './settingGroups';
import styles from './SettingsList.module.scss';
import { useMediaQuery } from '@shared/lib/hooks';
import { MobileTitle } from './MobileTitle/MobileTitle';

export const SettingsList = (): ReactElement => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <>
      {isMobile && <MobileTitle />}
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
    </>
  );
};
