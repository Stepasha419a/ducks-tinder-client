import { useForm } from 'react-hook-form';
import {
  submitProfileSettingsThunk,
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

    dispatch(
      submitProfileSettingsThunk({
        changedData: data.input.interests.map((interest) => interest.name),
      })
    );
    navigate(url);
  });

  return {
    control,
    settingName,
    submitHandler,
  };
}
