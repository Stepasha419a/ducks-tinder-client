import { useController, useForm } from 'react-hook-form';
import { useDefaultValues } from '@entities/setting/hooks';
import type { SettingFieldArrayValues } from '@entities/setting/model';
import {
  submitSettingsThunk,
  setIsUserInfoSetting,
} from '@entities/setting/model';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

export function useSelectForm() {
  const dispatch = useAppDispatch();

  const formName = useAppSelector((state) => state.setting.formName);

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm<SettingFieldArrayValues>({
    defaultValues: { input: useDefaultValues() as string[] },
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

  const toggleItem = (item: string): void => {
    if (items.includes(item)) {
      setItems(items.filter((interest: string) => interest !== item));
    } else {
      setItems([...items, item]);
    }
  };

  const cancelHandler = (): void => {
    dispatch(setIsUserInfoSetting(false));
    reset();
  };

  const submitHandler = handleSubmit((data: SettingFieldArrayValues) => {
    dispatch(submitSettingsThunk({ changedData: data.input }));
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
