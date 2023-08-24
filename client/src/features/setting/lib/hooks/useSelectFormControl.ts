import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectItem,
  SelectValidation,
} from '@/entities/setting/model';
import { getSelectData } from '@/entities/setting/lib';

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
      setItems(items.filter((candidate) => candidate.name !== item.name));
    } else if (isValid) {
      setItems([...items, item]);
    }
  };

  return { list, items, toggleItem, validation, isValid };
}

function isActive(items: SelectItem[], item: SelectItem): boolean {
  return items.some((candidate) => candidate.name === item.name);
}

function isActivatable(
  items: SelectItem[],
  validation: SelectValidation
): boolean {
  return items.length < validation.maxLength;
}
