import type { FC, ReactElement } from 'react';
import { TextField } from '@shared/ui';
import SettingWrapper from '../Wrapper/SettingWrapper';
import styles from './TextForm.module.scss';
import { useTextForm } from '../lib';

export const TextForm: FC = (): ReactElement => {
  const {
    formName,
    errors,
    isValid,
    registerProps,
    cancelHandler,
    submitHandler,
  } = useTextForm();

  return (
    <SettingWrapper
      formName={formName}
      errors={errors}
      isValid={isValid}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    >
      <TextField {...registerProps} extraClassName={styles.textInput} />
    </SettingWrapper>
  );
};
