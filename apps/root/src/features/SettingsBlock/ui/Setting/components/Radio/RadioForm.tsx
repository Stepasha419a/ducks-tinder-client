import type { FC, ReactElement } from 'react';

import { RadioInput } from '@ducks-tinder-client/ui';

import { useRadioForm } from '@features/SettingsBlock';

import { SettingWrapper } from '../components';
import * as styles from './RadioForm.module.scss';
import { useTranslation } from 'react-i18next';

export const RadioForm: FC = (): ReactElement => {
  const { t } = useTranslation();

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
          text={t('gender.male')}
          extraClassName={styles.radioInput}
        />
        <RadioInput
          onChange={onChange}
          checked={value === 'female'}
          name="sex"
          value="female"
          text={t('gender.female')}
          extraClassName={styles.radioInput}
        />
      </div>
    </SettingWrapper>
  );
};
