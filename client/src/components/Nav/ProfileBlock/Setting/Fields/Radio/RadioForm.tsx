import { useController, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { setIsUserInfoSetting } from '../../../../../../redux/settings/settings.slice';
import { submitSettingsThunk } from '../../../../../../redux/settings/settings.thunks';
import { RadioInput } from '../../../../../ui';
import { useDefaultValues } from '../../../../hooks';
import { SettingFieldValues } from '../../../../interfaces';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './RadioForm.module.scss';

export const RadioForm = () => {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) => state.settings.formName);

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

  const submitHandler = handleSubmit((data) => {
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
