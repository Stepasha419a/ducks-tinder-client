import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDefaultValues } from '@entities/setting/lib';
import type { SettingFieldValues } from '@entities/setting/model';
import { nullInput } from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { useNullOnClose } from './useNullOnClose';

// just to display nav form without any logic, all logic is in the main section
export function useExternalForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formName = useAppSelector((state) => state.setting.formName);

  const {
    formState: { errors },
  } = useForm<SettingFieldValues>({
    defaultValues: { input: useDefaultValues() as string },
    mode: 'onChange',
  });

  useNullOnClose();

  const cancelHandler = (): void => {
    dispatch(nullInput());
  };

  // submit is not a link => redirect internally
  const submitHandler = () => {
    dispatch(nullInput());
    navigate('profile');
  };

  return {
    formName,
    errors,
    cancelHandler,
    submitHandler,
  };
}
