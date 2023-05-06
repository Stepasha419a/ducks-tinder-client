import type { FC, ReactElement } from 'react';
import { RadioInput } from '@shared/ui';
import SettingWrapper from '../Wrapper/SettingWrapper';
import styles from './RadioForm.module.scss';
import { useRadioForm } from '../lib';

export const RadioForm: FC = (): ReactElement => {
  const {
    formName,
    errors,
    isValid,
    value,
    onChange,
    cancelHandler,
    submitHandler,
  } = useRadioForm();

  return (
    <SettingWrapper
      formName={formName}
      errors={errors}
      isValid={isValid}
      cancelHandler={cancelHandler}
      submitHandler={submitHandler}
    >
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
    </SettingWrapper>
  );
};
