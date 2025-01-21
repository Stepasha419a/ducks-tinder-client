import { TextField } from '@ducks-tinder-client/ui';
import type { FC, ReactElement } from 'react';
import { useTextForm } from '@features/SettingsBlock';
import { SettingWrapper } from '../components';
import styles from './TextForm.module.scss';

export const TextForm: FC = (): ReactElement => {
  const { formName, errors, isValid, registerProps, submitHandler } =
    useTextForm();

  return (
    <SettingWrapper
      formName={formName}
      errors={errors}
      isValid={isValid}
      submitHandler={submitHandler}
    >
      <TextField {...registerProps} extraClassName={styles.textInput} />
    </SettingWrapper>
  );
};
