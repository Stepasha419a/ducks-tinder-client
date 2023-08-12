import { useController, useForm } from 'react-hook-form';
import { useDefaultValues } from '@entities/setting/lib';
import type { SettingFieldInterestsArray } from '@entities/setting/model';
import { submitSettingsThunk, nullInput } from '@entities/setting/model';
import type { Interest } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector, useMediaQuery } from '@shared/lib/hooks';
import { useNavigate } from 'react-router-dom';
import { useNullOnClose } from './useNullOnClose';
import { ROUTES } from '@/shared/lib/constants';

export function useSelectForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery('(max-width: 900px)');

  const formName = useAppSelector((state) => state.setting.formName);

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm<SettingFieldInterestsArray>({
    defaultValues: { input: useDefaultValues() as Interest[] },
    mode: 'onChange',
  });

  const {
    field: { value: items, onChange: setItems },
  } = useController({
    name: 'input',
    control,
    rules: {
      required: 'Form is required',
    },
  });

  useNullOnClose();

  const toggleItem = (item: Interest): void => {
    if (items.some((interest) => interest.name === item.name)) {
      setItems(items.filter((interest) => interest.name !== item.name));
    } else {
      setItems([...items, item]);
    }
  };

  const cancelHandler = (): void => {
    dispatch(nullInput());
    reset();
  };

  const submitHandler = handleSubmit((data: SettingFieldInterestsArray) => {
    const url = isMobile ? ROUTES.settings : ROUTES.profile;

    dispatch(
      submitSettingsThunk({
        changedData: data.input.map((interest) => interest.name),
      })
    );
    navigate(url);
  });

  return {
    formName,
    errors,
    isValid,
    items,
    toggleItem,
    cancelHandler,
    submitHandler,
  };
}
