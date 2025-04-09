import type { ReactElement } from 'react';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { LinkThumbnail, SettingsGroup } from '@entities/user';

import {
  AccountGroup,
  AgeSettingThumbnail,
  DescriptionSettingThumbnail,
  DistanceSettingThumbnail,
  EmailSettingThumbnail,
  FindGroup,
  LinksGroup,
  LogoutButton,
  MobileTitle,
  NameSettingThumbnail,
  NicknameGroup,
  NicknameSettingThumbnail,
  PartnerAgeSettingThumbnail,
  PlaceSettingThumbnail,
  PreferSexSettingThumbnail,
  SexSettingThumbnail,
  SwitchThemeThumbnail,
} from './components';
import styles from './SettingsList.module.scss';

export const SettingsList = (): ReactElement => {
  const isMobile = useAdaptiveMediaQuery('(max-width: 900px)');

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
          <SwitchThemeThumbnail />
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
