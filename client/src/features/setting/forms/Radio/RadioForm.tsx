import type { FC, ReactElement } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useAppSelector } from '@hooks';
import type { ChangedData } from '@shared/api/interfaces';
import { RadioInput } from '@shared/ui';
import { useDefaultValues } from 'components/Nav/hooks';
import type { SettingFieldValues } from '@entities/setting/model/setting.interfaces';
import SettingWrapper from '../Wrapper/SettingWrapper';
import styles from './RadioForm.module.scss';

interface RadioFormProps{
  cancelFormHandler(): void;
  submitFormHandler(changedData: ChangedData): void;
}

export const RadioForm: FC<RadioFormProps> = ({cancelFormHandler, submitFormHandler}): ReactElement => {
  const formName = useAppSelector((state) => state.setting.formName);

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

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    submitFormHandler(data.input);
  });

  const cancelHandler = (): void => cancelFormHandler();

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
