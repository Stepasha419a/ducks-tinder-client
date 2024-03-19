import { useForm } from 'react-hook-form';
import type {
  SettingFieldValues,
  SettingNameEnum,
} from '@entities/user/model/setting';
import { nullInput, submitSettingsThunk } from '@entities/user/model/setting';
import { useCurrentValidation, useDefaultValues } from '@entities/user/lib';
import { useAppDispatch, useMediaQuery } from '@shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { useNullOnClose } from './useNullOnClose';
import { ROUTES } from '@shared/lib/constants';
import { useSettingUrlNew } from '@/entities/user/lib/hooks';
import { useEffect, useRef } from 'react';

export function useTextForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const lastExistingValues = useRef<{
    settingName: SettingNameEnum | null;
    formName: string | null;
  }>({ settingName: null, formName: null });

  const isMobile = useMediaQuery('(max-width: 900px)');

  const setting = useSettingUrlNew();

  useEffect(() => {
    if (setting?.formName) {
      lastExistingValues.current.formName = setting.formName;
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (setting?.settingName) {
      lastExistingValues.current.settingName = setting.settingName;
    }
  }, [setting?.formName, setting?.settingName]);

  const settingName = (setting?.settingName ||
    lastExistingValues.current.settingName)!;
  const formName = (setting?.formName || lastExistingValues.current.formName)!;

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

  useNullOnClose();

  const cancelHandler = (): void => {
    dispatch(nullInput());
  };

  const submitHandler = handleSubmit((data: SettingFieldValues) => {
    const url = isMobile ? ROUTES.settings : ROUTES.profile;

    dispatch(submitSettingsThunk({ [settingName]: data.input }));
    navigate(url);
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
