import type { ReactElement } from 'react';
import {
  Account,
  Find,
  LinksSettingGroup,
  SettingsGroup,
} from '@entities/setting/components';
import { LogoutButton } from '@features/setting/LogoutButton/LogoutButton';
import styles from './SettingsList.module.scss';
import { NicknameSettingThumbnail } from '../settingFeatureThumbnails';

// TODO: decompose it into nav's components
export const SettingsList = (): ReactElement => {
  return (
    <div className={styles.groups}>
      <Account />
      <Find />
      <SettingsGroup
        title="Internet account"
        descr="Create a username, share it and start searching for couples on Tinder around the world."
      >
        <NicknameSettingThumbnail />
      </SettingsGroup>
      <LinksSettingGroup />
      <SettingsGroup>
        <LogoutButton />
      </SettingsGroup>
    </div>
  );
};
