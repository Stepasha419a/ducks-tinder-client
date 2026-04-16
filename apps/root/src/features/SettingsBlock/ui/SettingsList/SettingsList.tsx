import type { ReactElement } from 'react';

import { useAdaptiveMediaQuery } from '@ducks-tinder-client/common';

import { LinkThumbnail, SettingsGroup } from '@entities/user';

import {
  AccountGroup,
  AgeSettingThumbnail,
  DescriptionSettingThumbnail,
  DisplayGroup,
  DistanceSettingThumbnail,
  EmailSettingThumbnail,
  FindGroup,
  LinksGroup,
  LogoutButton,
  MobileTitle,
  NameSettingThumbnail,
  NicknameSettingThumbnail,
  PartnerAgeSettingThumbnail,
  PlaceSettingThumbnail,
  PreferSexSettingThumbnail,
  SelectLanguageThumbnail,
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
          <NicknameSettingThumbnail />
        </AccountGroup>
        <FindGroup>
          <PlaceSettingThumbnail />
          <DistanceSettingThumbnail />
          <PreferSexSettingThumbnail />
          <PartnerAgeSettingThumbnail />
        </FindGroup>
        <DisplayGroup>
          <SwitchThemeThumbnail />
          <SelectLanguageThumbnail />
        </DisplayGroup>
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
