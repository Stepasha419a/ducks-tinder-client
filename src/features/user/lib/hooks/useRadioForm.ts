import { useController, useForm } from 'react-hook-form';
import type { SettingFieldValues } from '@entities/user/model/setting';
import { submitSettingsThunk } from '@entities/user/model/setting';
import { useDefaultValues } from '@entities/user/lib';
import { useAppDispatch, useMediaQuery } from '@shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants';
import { useMemoriedSettingUrl } from '@/entities/user/lib/hooks';

export function useRadioForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width: 900px)');

  const { settingName, formName } = useMemoriedSettingUrl()!;

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SettingFieldValues>({
    defaultValues: { input: useDefaultValues(settingName) as string },
  });

  const {
    field: { value, onChange },
  } = useController({ name: 'input', control, rules: { required: true } });

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    const url = isMobile ? ROUTES.settings : ROUTES.profile;

    dispatch(submitSettingsThunk({ [settingName]: data.input }));
    navigate(url);
  });

  return {
    formName,
    errors,
    isValid,
    value,
    onChange,
    submitHandler,
  };
}
