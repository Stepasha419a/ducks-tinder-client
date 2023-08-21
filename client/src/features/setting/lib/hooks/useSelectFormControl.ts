import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectItem,
} from '@/entities/setting/model';

export function useSelectFormControl(
  control: Control<MultiSelectForm>,
  settingFieldName: ProfileSettingSelectName
) {
  const {
    field: { value: items, onChange: setItems },
  } = useController({
    name: `input.${settingFieldName}`,
    control,
    rules: {
      required: 'Form is required',
    },
  });

  const toggleItem = (item: SelectItem): void => {
    if (items.some((interest) => interest.name === item.name)) {
      setItems(items.filter((candidate) => candidate.name !== item.name));
    } else {
      setItems([...items, item]);
    }
  };

  return { items, toggleItem };
}
