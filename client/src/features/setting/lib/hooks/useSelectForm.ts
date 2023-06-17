import { useController, useForm } from 'react-hook-form';
import { useDefaultValues } from '@entities/setting/hooks';
import type { SettingFieldInterestArray } from '@entities/setting/model';
import {
  submitSettingsThunk,
  setIsUserInfoSetting,
} from '@entities/setting/model';
import type { Interest } from '@shared/api/interfaces';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

export function useSelectForm() {
  const dispatch = useAppDispatch();

  const formName = useAppSelector((state) => state.setting.formName);

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm<SettingFieldInterestArray>({
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

  const toggleItem = (item: Interest): void => {
    if (items.includes(item)) {
      setItems(
        items.filter((interest: Interest) => interest.name !== item.name)
      );
    } else {
      setItems([...items, item]);
    }
  };

  const cancelHandler = (): void => {
    dispatch(setIsUserInfoSetting(false));
    reset();
  };

  const submitHandler = handleSubmit((data: SettingFieldInterestArray) => {
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
