import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { Textarea } from '../../../../../ui';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './TextareaForm.module.scss';
import { useCurrentValidation, useDefaultValues } from '../../../../hooks';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import { setIsUserInfoSetting } from '../../../../../../redux/settings/settings.slice';
import { SettingFieldValues } from '../../../../interfaces';

export const TextareaForm = () => {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) => state.settings.formName);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SettingFieldValues>({
    defaultValues: { input: useDefaultValues() },
    mode: 'onChange',
  });

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
  });

  const cancelHandler = () => {
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