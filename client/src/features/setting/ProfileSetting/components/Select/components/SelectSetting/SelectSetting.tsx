import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectItem,
} from '@/entities/setting/model';
import styles from './SelectSetting.module.scss';
import { ListItem } from '@/shared/ui';
import { SETTING_INTERESTS_LIST } from '@/entities/setting/model/setting.constants';

interface SelectSettingProps {
  control: Control<MultiSelectForm>;
  settingFieldName: ProfileSettingSelectName;
}

export const SelectSetting: FC<SelectSettingProps> = ({
  control,
  settingFieldName,
}) => {
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

  return (
    <>
      <div className={styles.subhead}>
        <div className={styles.title}>Interests</div>
        <div className={styles.limit}>({items.length}/16)</div>
      </div>
      <div className={styles.items}>
        {SETTING_INTERESTS_LIST.map((selectItem) => {
          const isActive = items.some((item) => selectItem === item.name);
          return (
            <ListItem
              onClick={() => toggleItem({ name: selectItem })}
              isActive={isActive}
              pointer
              key={selectItem}
              extraClassName={styles.item}
            >
              {selectItem}
            </ListItem>
          );
        })}
      </div>
    </>
  );
};
