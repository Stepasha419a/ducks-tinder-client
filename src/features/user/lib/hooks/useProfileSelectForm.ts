import { useForm } from 'react-hook-form';
import { updateUserThunk } from '@entities/user/model/user';
import type { MultiSelectForm } from '@entities/user/model/user';
import {
  useDefaultProfileValues,
  useProfileSettingUrl,
} from '@entities/user/lib';
import { useAppDispatch } from '@shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants';
import { parseSelectData } from '../helpers';

export function useProfileSelectForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const profileSetting = useProfileSettingUrl()!;

  const { handleSubmit, control } = useForm<MultiSelectForm>({
    defaultValues: useDefaultProfileValues(profileSetting.settingName),
    mode: 'onChange',
  });

  const submitHandler = handleSubmit((data: MultiSelectForm) => {
    const parsedData = parseSelectData(data);

    dispatch(updateUserThunk(parsedData));
    navigate(`${ROUTES.PROFILE}/edit`);
  });

  return {
    control,
    settingName: profileSetting.settingName,
    submitHandler,
  };
}
