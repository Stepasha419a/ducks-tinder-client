import { useController, useForm } from 'react-hook-form';
import type { SettingFieldValues } from '@entities/setting/model';
import { nullInput, submitSettingsThunk } from '@entities/setting/model';
import { useDefaultValues } from '@entities/setting/hooks';
import { useAppDispatch, useAppSelector } from '@/shared/hooks';
import { useNavigate } from 'react-router-dom';
import { useNullOnClose } from './useNullOnClose';

export function useRadioForm() {
  const navigate = useNavigate();
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

  useNullOnClose();

  const cancelHandler = (): void => {
    dispatch(nullInput());
  };

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
    navigate('profile');
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
