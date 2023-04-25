import type { FC, ReactElement } from 'react';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@hooks';
import { RadioInput } from '@shared/ui';
import { useDefaultValues } from '@entities/setting/hooks';
import type { SettingFieldValues } from '@entities/setting/model/setting.interfaces';
import SettingWrapper from '../Wrapper/SettingWrapper';
import {
  setIsUserInfoSetting,
  submitSettingsThunk,
} from '@entities/setting/model';
import styles from './RadioForm.module.scss';

export const RadioForm: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const formName = useAppSelector((state) => state.setting.formName);

  useEffect(() => {
    return () => {
      dispatch(setIsUserInfoSetting(false));
    };
  });

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SettingFieldValues>({
    defaultValues: { input: useDefaultValues() as string },
  });

  const {
    field: { value, onChange },
  } = useController({ name: 'input', control, rules: { required: true } });

  const cancelHandler = (): void => {
    dispatch(setIsUserInfoSetting(false));
  };

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
  });

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
