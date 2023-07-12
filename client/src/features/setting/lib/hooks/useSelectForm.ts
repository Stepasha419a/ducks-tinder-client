import { useController, useForm } from 'react-hook-form';
import { useDefaultValues } from '@entities/setting/hooks';
import type { SettingFieldInterestsArray } from '@entities/setting/model';
import { submitSettingsThunk, nullInput } from '@entities/setting/model';
import type { Interest } from '@/shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { useNavigate } from 'react-router-dom';
import { useNullOnClose } from './useNullOnClose';

export function useSelectForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    dispatch(
      submitSettingsThunk({
        changedData: data.input.map((interest) => interest.name),
      })
    );
    navigate('profile');
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
