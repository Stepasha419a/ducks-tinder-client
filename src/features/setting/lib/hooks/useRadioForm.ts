import { useController, useForm } from 'react-hook-form';
import type { SettingFieldValues } from '@entities/setting/model';
import { nullInput, submitSettingsThunk } from '@entities/setting/model';
import { useDefaultValues } from '@entities/setting/lib';
import {
  useAppDispatch,
  useAppSelector,
  useMediaQuery,
} from '@shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { useNullOnClose } from './useNullOnClose';
import { ROUTES } from '@shared/lib/constants';

export function useRadioForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width: 900px)');

  const formName = useAppSelector((state) => state.setting.formName);
  const settingName = useAppSelector((state) => state.setting.settingName);

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
    const url = isMobile ? ROUTES.settings : ROUTES.profile;

    dispatch(submitSettingsThunk({ [settingName!]: data.input }));
    navigate(url);
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
