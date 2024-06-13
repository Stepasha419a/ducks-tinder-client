import type { FC, ReactElement } from 'react';
import { useTextForm } from '@features/user';
import { TextField } from '@shared/ui';
import SettingWrapper from '../Wrapper/SettingWrapper';
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
