import type { ReactElement } from 'react';
import { LinkThumbnail, SettingsGroup } from '@entities/setting/components';

export const LinksSettingGroup = (): ReactElement => {
  return (
    <SettingsGroup title="Safety Tips">
      <LinkThumbnail href="/policy" title="Community Rules" />
      <LinkThumbnail
        href="/policy"
        title="Security and Policy Development Center"
      />
      <LinkThumbnail href="/policy" title="Safety Tips" />
    </SettingsGroup>
  );
};
