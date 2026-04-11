import type { FC, ReactElement } from 'react';

import { RadioInput } from '@ducks-tinder-client/ui';

import { useRadioForm } from '@features/SettingsBlock';

import { SettingWrapper } from '../components';
import * as styles from './RadioForm.module.scss';

export const RadioForm: FC = (): ReactElement => {
  const { errors, isValid, value, onChange, submitHandler, settingName } =
    useRadioForm();

  return (
    <SettingWrapper
      formName={settingName}
      errors={errors}
      isValid={isValid}
      submitHandler={submitHandler}
    >
      <div className={styles.radioWrapper}>
        <RadioInput
          onChange={onChange}
          checked={value === 'male'}
          name="sex"
          value="male"
          text="Male"
          extraClassName={styles.radioInput}
        />
        <RadioInput
          onChange={onChange}
          checked={value === 'female'}
          name="sex"
          value="female"
          text="Female"
          extraClassName={styles.radioInput}
        />
      </div>
    </SettingWrapper>
  );
};
