import type { FC, ReactElement } from 'react';

import { useProfileSelectForm } from '@features/ProfileSetting';

import { SettingsGroup, SettingWrapper } from './components';

export const SelectForm: FC = (): ReactElement => {
  const { control, settingName, submitHandler } = useProfileSelectForm();

  return (
    <SettingWrapper settingName={settingName} handleSubmit={submitHandler}>
      <SettingsGroup control={control} />
    </SettingWrapper>
  );
};
