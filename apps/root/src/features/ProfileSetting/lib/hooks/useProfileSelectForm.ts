import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  ROUTES,
  updateUserThunk,
  useAppDispatch,
} from '@ducks-tinder-client/common';

import type { MultiSelectForm } from '@entities/user';
import {
  parseSelectData,
  useDefaultProfileValues,
  useProfileSettingUrl,
} from '@entities/user';

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
