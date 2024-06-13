import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDefaultValues } from '@entities/user';
import { useMemoriedSettingUrl } from '@entities/user';
import { updateUserThunk } from '@entities/user';
import { ROUTES } from '@shared/lib/constants';
import { useAppDispatch, useMediaQuery } from '@shared/lib/hooks';
import type { SettingFieldValues } from './useCurrentValidation';
import { useCurrentValidation } from './useCurrentValidation';

export function useTextForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width: 900px)');

  const { settingName, formName } = useMemoriedSettingUrl();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<SettingFieldValues>({
    defaultValues: {
      input: useDefaultValues(settingName) as string,
    },
    mode: 'onChange',
  });

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    const url = isMobile ? ROUTES.SETTINGS : ROUTES.PROFILE;

    dispatch(updateUserThunk({ [settingName]: data.input }));
    navigate(url);
  });

  const registerProps = register('input', useCurrentValidation());

  return {
    formName,
    errors,
    isValid,
    registerProps,
    submitHandler,
  };
}
