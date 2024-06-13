import type { FC, ReactElement } from 'react';
import { useProfileSelectForm } from '@features/user';
import { SettingWrapper } from '../Wrapper/SettingWrapper';
import { SettingsGroup } from './components';

export const SelectForm: FC = (): ReactElement => {
  const { control, settingName, submitHandler } = useProfileSelectForm();

  return (
    <SettingWrapper settingName={settingName} handleSubmit={submitHandler}>
      <SettingsGroup control={control} />
    </SettingWrapper>
  );
};
