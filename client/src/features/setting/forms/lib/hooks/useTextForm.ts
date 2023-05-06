import { useForm } from 'react-hook-form';
import type { SettingFieldValues } from '@entities/setting/model';
import {
  setIsUserInfoSetting,
  submitSettingsThunk,
} from '@entities/setting/model';
import {
  useCurrentValidation,
  useDefaultValues,
} from '@entities/setting/hooks';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

export function useTextForm() {
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

  const cancelHandler = (): void => {
    dispatch(setIsUserInfoSetting(false));
  };

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
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
