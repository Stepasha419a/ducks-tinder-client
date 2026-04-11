import type { FC, ReactElement } from 'react';

import { Textarea } from '@ducks-tinder-client/ui';

import { useTextForm } from '@features/SettingsBlock';

import { SettingWrapper } from '../components';
import * as styles from './TextareaForm.module.scss';

export const TextareaForm: FC = (): ReactElement => {
  const { errors, isValid, registerProps, submitHandler, settingName } =
    useTextForm();

  return (
    <SettingWrapper
      formName={settingName}
      isValid={isValid}
      errors={errors}
      submitHandler={submitHandler}
    >
      <Textarea {...registerProps} extraClassName={styles.textarea} />
    </SettingWrapper>
  );
};
