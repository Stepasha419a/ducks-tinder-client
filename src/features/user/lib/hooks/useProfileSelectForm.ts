import { useForm } from 'react-hook-form';
import { submitSettingsThunk } from '@entities/user/model/setting';
import type { MultiSelectForm } from '@entities/user/model/setting';
import { useDefaultProfileValues } from '@entities/user/lib';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants';
import { useProfileNullOnClose } from './useProfileNullOnClose';
import { parseSelectData } from '../helpers';

export function useProfileSelectForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const settingName = useAppSelector(
    (state) => state.setting.profileSetting.settingName
  );

  const { handleSubmit, control } = useForm<MultiSelectForm>({
    defaultValues: useDefaultProfileValues(settingName!),
    mode: 'onChange',
  });

  useProfileNullOnClose();

  const submitHandler = handleSubmit((data: MultiSelectForm) => {
    const parsedData = parseSelectData(data);

    dispatch(submitSettingsThunk(parsedData));
    navigate(`${ROUTES.profile}/edit`);
  });

  return {
    control,
    settingName,
    submitHandler,
  };
}
