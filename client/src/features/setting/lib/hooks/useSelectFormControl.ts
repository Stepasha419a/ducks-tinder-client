import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectItem,
  SelectValidation,
} from '@entities/setting/model';
import { getSelectData } from '@entities/setting/lib';
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

  const toggleItem = (item: SelectItem): void => {
    if (getIsActive(items, item.name)) {
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

function getActiveLength(items: SelectItem[] | SelectItem | null): number {
  if (Array.isArray(items)) {
    return items.length;
  }
  if (items !== null) {
    return 1;
  }
  return 0;
}

function getIsActive(
  items: SelectItem[] | SelectItem | null,
  item: string
): boolean {
  if (Array.isArray(items)) {
    return items.some((candidate) => candidate.name === item);
  }
  if (items !== null) {
    return items.name === item;
  }
  return false;
}

function addItem(
  value: SelectItem,
  items: SelectItem[] | SelectItem | null,
  setItems: (data: SelectItem[] | SelectItem | null) => void,
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
  value: SelectItem,
  items: SelectItem[] | SelectItem | null,
  setItems: (data: SelectItem[] | SelectItem | null) => void
) {
  if (Array.isArray(items)) {
    setItems(items.filter((candidate) => candidate.name !== value.name));
  } else {
    setItems(null);
  }
}

function isActivatable(
  items: SelectItem[] | SelectItem | null,
  validation: SelectValidation
): boolean {
  if (Array.isArray(items)) {
    return items.length < validation.maxLength;
  }
  return true;
}
