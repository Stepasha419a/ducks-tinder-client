import type { FC, ReactElement } from 'react';
import { useProfileSelectForm } from '@features/user';
import { SettingsGroup, SettingWrapper } from './ui';

export const SelectForm: FC = (): ReactElement => {
  const { control, settingName, submitHandler } = useProfileSelectForm();

  return (
    <SettingWrapper settingName={settingName} handleSubmit={submitHandler}>
      <SettingsGroup control={control} />
    </SettingWrapper>
  );
};
