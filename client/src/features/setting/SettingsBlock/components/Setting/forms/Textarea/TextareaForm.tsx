import type { FC, ReactElement } from 'react';
import { Textarea } from '@shared/ui';
import SettingWrapper from '../Wrapper/SettingWrapper';
import { useTextForm } from '@features/setting/lib';
import styles from './TextareaForm.module.scss';

export const TextareaForm: FC = (): ReactElement => {
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
      isValid={isValid}
      errors={errors}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    >
      <Textarea {...registerProps} extraClassName={styles.textarea} />
    </SettingWrapper>
  );
};
