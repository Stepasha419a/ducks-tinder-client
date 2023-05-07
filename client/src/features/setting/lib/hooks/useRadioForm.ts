import { useController, useForm } from 'react-hook-form';
import type { SettingFieldValues } from '@entities/setting/model';
import {
  setIsUserInfoSetting,
  submitSettingsThunk,
} from '@entities/setting/model';
import { useDefaultValues } from '@entities/setting/hooks';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';

export function useRadioForm() {
  const dispatch = useAppDispatch();

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

  const cancelHandler = (): void => {
    dispatch(setIsUserInfoSetting(false));
  };

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
  });

  return {
    formName,
    errors,
    isValid,
    value,
    onChange,
    cancelHandler,
    submitHandler,
  };
}
