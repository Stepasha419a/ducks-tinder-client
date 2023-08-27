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
      setItems(items!.filter((candidate) => candidate.name !== item.name));
    } else if (isValid) {
      const value = items ? [...items, item] : [item];
      setItems(value);
    }
  };

  return { list, items, toggleItem, validation, isValid };
}

function isActive(items: SelectItem[] | null, item: SelectItem): boolean {
  if (!items) {
    return false;
  }
  return items.some((candidate) => candidate.name === item.name);
}

function isActivatable(
  items: SelectItem[] | null,
  validation: SelectValidation
): boolean {
  if (!items) {
    return true;
  }
  return items.length < validation.maxLength;
}
