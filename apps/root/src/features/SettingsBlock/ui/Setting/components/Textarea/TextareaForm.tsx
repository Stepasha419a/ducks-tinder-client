import { Textarea } from '@ducks-tinder-client/ui';
import type { FC, ReactElement } from 'react';
import { useTextForm } from '@features/SettingsBlock';
import { SettingWrapper } from '../components';
import styles from './TextareaForm.module.scss';

export const TextareaForm: FC = (): ReactElement => {
  const { formName, errors, isValid, registerProps, submitHandler } =
    useTextForm();

  return (
    <SettingWrapper
      formName={formName}
      isValid={isValid}
      errors={errors}
      submitHandler={submitHandler}
    >
      <Textarea {...registerProps} extraClassName={styles.textarea} />
    </SettingWrapper>
  );
};
