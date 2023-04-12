import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@hooks';
import { setIsUserInfoSetting } from '@entities/setting/model';
import { submitSettingsThunk } from '@entities/setting/model';
import { TextField } from '@shared/ui';
import { useCurrentValidation, useDefaultValues } from 'components/Nav/hooks';
import type { SettingFieldValues } from 'components/Nav/interfaces';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './TextForm.module.scss';

export const TextForm = (): ReactElement => {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) => state.setting.formName);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SettingFieldValues>({
    defaultValues: { input: useDefaultValues() as string },
    mode: 'onChange',
  });

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
  });

  const cancelHandler = (): void => {
    dispatch(setIsUserInfoSetting(false));
  };

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
