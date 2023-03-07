import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { setIsUserInfoSetting } from '../../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import { TextField } from '../../../../../ui';
import { useCurrentValidation, useDefaultValues } from '../../../../hooks';
import { SettingFieldValues } from '../../../../interfaces';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './TextForm.module.scss';

export const TextForm = () => {
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
