import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectValidation,
} from '@entities/user/model/user';
import { getSelectData } from '@entities/user/lib';
import { getProfileSettingTitles } from '../helpers';

export function useSelectFormControl(
  control: Control<MultiSelectForm>,
  settingFieldName: ProfileSettingSelectName
) {
  const {
    field: { value: items, onChange: setItems },
  } = useController({
    name: `input.${settingFieldName}`,
    control,
  });

  const { list, validation } = getSelectData(settingFieldName);
  const title = getProfileSettingTitles(settingFieldName);

  const activeLength = getActiveLength(items);

  const isValid = isActivatable(items, validation);

  const toggleItem = (item: string): void => {
    if (getIsActive(items, item)) {
      deleteItem(item, items, setItems);
    } else {
      addItem(item, items, setItems, isValid);
    }
  };

  return {
    title,
    list,
    items,
    toggleItem,
    validation,
    isValid,
    getIsActive,
    activeLength,
  };
}

function getActiveLength(items: string[] | string | null): number {
  if (Array.isArray(items)) {
    return items.length;
  }
  if (items !== null) {
    return 1;
  }
  return 0;
}

function getIsActive(items: string[] | string | null, item: string): boolean {
  if (Array.isArray(items)) {
    return items.some((candidate) => candidate === item);
  }
  if (items !== null) {
    return items === item;
  }
  return false;
}

function addItem(
  value: string,
  items: string[] | string | null,
  setItems: (data: string[] | string | null) => void,
  isValid: boolean
) {
  if (Array.isArray(items)) {
    if (isValid) {
      setItems([...items, value]);
    }
  } else {
    setItems(value);
  }
}

function deleteItem(
  value: string,
  items: string[] | string | null,
  setItems: (data: string[] | string | null) => void
) {
  if (Array.isArray(items)) {
    setItems(items.filter((candidate) => candidate !== value));
  } else {
    setItems(null);
  }
}

function isActivatable(
  items: string[] | string | null,
  validation: SelectValidation
): boolean {
  if (Array.isArray(items)) {
    return items.length < validation.maxLength;
  }
  return true;
}
