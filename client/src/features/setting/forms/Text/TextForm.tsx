import type { FC, ReactElement } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@hooks';
import { TextField } from '@shared/ui';
import {
  useCurrentValidation,
  useDefaultValues,
} from '@entities/setting/hooks';
import type { SettingFieldValues } from '@entities/setting/model/setting.interfaces';
import SettingWrapper from '../Wrapper/SettingWrapper';
import {
  setIsUserInfoSetting,
  submitSettingsThunk,
} from '@entities/setting/model';
import styles from './TextForm.module.scss';

export const TextForm: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  const formName = useAppSelector((state) => state.setting.formName);

  useEffect(() => {
    return () => {
      dispatch(setIsUserInfoSetting(false));
    };
  });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SettingFieldValues>({
    defaultValues: { input: useDefaultValues() as string },
    mode: 'onChange',
  });

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
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    >
      <TextField
        {...register('input', useCurrentValidation())}
        extraClassName={styles.textInput}
      />
    </SettingWrapper>
  );
};
