import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Textarea } from '@shared/ui';
import { submitSettingsThunk } from '@entities/setting/model';
import { setIsUserInfoSetting } from '@entities/setting/model';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import { useCurrentValidation, useDefaultValues } from 'components/Nav/hooks';
import type { SettingFieldValues } from 'components/Nav/interfaces';
import styles from './TextareaForm.module.scss';

export const TextareaForm = (): ReactElement => {
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
      isValid={isValid}
      errors={errors}
      submitHandler={submitHandler}
      cancelHandler={cancelHandler}
    >
      <Textarea
        {...register('input', useCurrentValidation())}
        extraClassName={styles.textarea}
      />
    </SettingWrapper>
  );
};
