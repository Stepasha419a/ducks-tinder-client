import type { FC, ReactElement } from 'react';
import { SettingWrapper } from '../Wrapper/SettingWrapper';
import { useProfileSelectForm } from '@features/setting/lib';
import { SettingsGroup } from './components';

export const SelectForm: FC = (): ReactElement => {
  const { control, settingName, submitHandler } = useProfileSelectForm();

  return (
    <SettingWrapper settingName={settingName} handleSubmit={submitHandler}>
      <SettingsGroup control={control} />
    </SettingWrapper>
  );
};
