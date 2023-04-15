import type { ReactElement } from 'react';
import { useAppDispatch } from '@hooks';
import { logoutThunk } from '@entities/auth/model';
import { SettingThumbnail, SettingsGroup } from '@shared/ui';

export const LogoutButton = (): ReactElement => {
  const dispatch = useAppDispatch();

  return (
    <SettingsGroup>
      <SettingThumbnail
        clickHandler={async () => dispatch(logoutThunk())}
        title='Log out'
        isPointer
        isLogout
      />
    </SettingsGroup>
  );
};
