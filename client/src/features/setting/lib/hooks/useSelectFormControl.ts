import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectItem,
  SelectValidation,
} from '@entities/setting/model';
import { getSelectData } from '@entities/setting/lib';

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

  const isValid = isActivatable(items, validation);

  const toggleItem = (item: SelectItem): void => {
    if (isActive(items, item)) {
      const value = Array.isArray(items)
        ? items.filter((candidate) => candidate.name !== item.name)
        : items;
      setItems(value);
    } else if (isValid) {
      const value = Array.isArray(items) ? [...items, item] : item;
      setItems(value);
    }
  };

  return { list, items, toggleItem, validation, isValid };
}

function isActive(
  items: SelectItem[] | SelectItem | null,
  item: SelectItem
): boolean {
  if (Array.isArray(items)) {
    return items.some((candidate) => candidate.name === item.name);
  }
  if (items !== null) {
    return items.name === item.name;
  }
  return false;
}

function isActivatable(
  items: SelectItem[] | SelectItem | null,
  validation: SelectValidation
): boolean {
  if (Array.isArray(items)) {
    return items.length < validation.maxLength;
  } else if (items !== null) {
    return false;
  }
  return true;
}
