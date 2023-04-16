import type { FC, ReactElement } from 'react';
import { SettingThumbnail, SettingsGroup } from '@shared/ui';

interface LogoutButtonProps {
  logout(): void;
}

export const LogoutButton: FC<LogoutButtonProps> = ({logout}): ReactElement => {
  return (
    <SettingsGroup>
      <SettingThumbnail
        clickHandler={logout}
        title='Log out'
        isPointer
        isLogout
      />
    </SettingsGroup>
  );
};
