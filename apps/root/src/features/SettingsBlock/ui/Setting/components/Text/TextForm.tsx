import type { FC, ReactElement } from 'react';

import { TextField } from '@ducks-tinder-client/ui';

import { useTextForm } from '@features/SettingsBlock';

import { SettingWrapper } from '../components';
import * as styles from './TextForm.module.scss';

export const TextForm: FC = (): ReactElement => {
  const { errors, isValid, registerProps, submitHandler, settingName } =
    useTextForm();

  return (
    <SettingWrapper
      formName={settingName}
      errors={errors}
      isValid={isValid}
      submitHandler={submitHandler}
    >
      <TextField {...registerProps} extraClassName={styles.textInput} />
    </SettingWrapper>
  );
};
