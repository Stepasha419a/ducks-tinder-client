import { useForm } from 'react-hook-form';
import {
  submitRelationSettingsThunk,
  submitSettingsThunk,
} from '@entities/setting/model';
import type { MultiSelectForm } from '@entities/setting/model';
import { useDefaultProfileValues } from '@entities/setting/lib';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/lib/constants';
import { useProfileNullOnClose } from './useProfileNullOnClose';
import { isRelationsSetting, parseSelectData } from '../helpers';

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
    const isRelation = isRelationsSetting(settingName!);
    const parsedData = parseSelectData(data);

    if (isRelation) {
      dispatch(submitRelationSettingsThunk(parsedData));
    } else {
      dispatch(submitSettingsThunk(parsedData));
    }
    navigate(`${ROUTES.profile}/edit`);
  });

  return {
    control,
    settingName,
    submitHandler,
  };
}
