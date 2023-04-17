import type { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@hooks';
import type { ChangedData } from '@shared/api/interfaces';
import { Textarea } from '@shared/ui';
import SettingWrapper from '../Wrapper/SettingWrapper';
import {
  useCurrentValidation,
  useDefaultValues,
} from '@entities/setting/hooks';
import type { SettingFieldValues } from '@entities/setting/model/setting.interfaces';
import styles from './TextareaForm.module.scss';

interface TextareaFormProps {
  cancelFormHandler(): void;
  submitFormHandler(changedData: ChangedData): void;
}

export const TextareaForm: FC<TextareaFormProps> = ({
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
