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
import * as styles from './SettingsList.module.scss';
import { useTranslation } from 'react-i18next';

export const SettingsList = (): ReactElement => {
  const { t } = useTranslation();

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
          <LinkThumbnail
            href="/policy"
            title={t('profile.settings.safety.links.community')}
          />
          <LinkThumbnail
            href="/policy"
            title={t('profile.settings.safety.links.security')}
          />
          <LinkThumbnail
            href="/policy"
            title={t('profile.settings.safety.links.tips')}
          />
        </LinksGroup>
        <SettingsGroup>
          <LogoutButton />
        </SettingsGroup>
      </div>
    </>
  );
};
