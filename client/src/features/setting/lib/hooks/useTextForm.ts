import { useForm } from 'react-hook-form';
import type { SettingFieldValues } from '@entities/setting/model';
import { nullInput, submitSettingsThunk } from '@entities/setting/model';
import {
  useCurrentValidation,
  useDefaultValues,
} from '@entities/setting/hooks';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { useNavigate } from 'react-router-dom';
import { useNullOnClose } from './useNullOnClose';

export function useTextForm() {
  const navigate = useNavigate();
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

  useNullOnClose();

  const cancelHandler = (): void => {
    dispatch(nullInput());
  };

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
    navigate('profile');
  });

  const registerProps = register('input', useCurrentValidation());

  return {
    formName,
    errors,
    isValid,
    registerProps,
    cancelHandler,
    submitHandler,
  };
}
