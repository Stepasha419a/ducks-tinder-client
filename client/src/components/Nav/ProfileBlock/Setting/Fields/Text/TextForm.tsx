import type { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@hooks';
import type { ChangedData } from '@shared/api/interfaces';
import { TextField } from '@shared/ui';
import { useCurrentValidation, useDefaultValues } from 'components/Nav/hooks';
import type { SettingFieldValues } from 'components/Nav/interfaces';
import SettingWrapper from '../../Wrapper/SettingWrapper';
import styles from './TextForm.module.scss';

interface TextFormProps {
  cancelFormHandler(): void;
  submitFormHandler(changedData: ChangedData): void;
}

export const TextForm: FC<TextFormProps> = ({
  cancelFormHandler,
  submitFormHandler,
}): ReactElement => {
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
    submitFormHandler(data.input);
  });

  const cancelHandler = (): void => cancelFormHandler();

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
