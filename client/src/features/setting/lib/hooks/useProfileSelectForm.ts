import { useForm } from 'react-hook-form';
import {
  submitProfileSelectSettingsThunk,
  type SelectItem,
} from '@/entities/setting/model';
import type { MultiSelectForm } from '@entities/setting/model';
import { useDefaultProfileValues } from '@/entities/setting/lib';
import {
  useAppDispatch,
  useAppSelector,
  useMediaQuery,
} from '@shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants';
import { useProfileNullOnClose } from './useProfileNullOnClose';
import { parseSelectData } from '../helpers';

export function useProfileSelectForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width: 900px)');

  const settingName = useAppSelector(
    (state) => state.setting.profileSetting.settingName
  );

  const { handleSubmit, control } = useForm<MultiSelectForm>({
    defaultValues: {
      input: { interests: useDefaultProfileValues() as SelectItem[] },
    },
    mode: 'onChange',
  });

  useProfileNullOnClose();

  const submitHandler = handleSubmit((data: MultiSelectForm) => {
    const url = isMobile ? ROUTES.settings : ROUTES.profile;

    const parsedData = parseSelectData(data);
    dispatch(submitProfileSelectSettingsThunk(parsedData));
    navigate(url);
  });

  return {
    control,
    settingName,
    submitHandler,
  };
}
