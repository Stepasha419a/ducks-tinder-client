import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type {
  MultiSelectForm,
  ProfileSettingSelectName,
} from '@/entities/setting/model';
import styles from './SelectSetting.module.scss';
import { ListItem } from '@/shared/ui';
import { SETTING_INTERESTS_LIST } from '@/entities/setting/model/setting.constants';
import { useSelectFormControl } from '@/features/setting/lib/hooks';

interface SelectSettingProps {
  control: Control<MultiSelectForm>;
  settingFieldName: ProfileSettingSelectName;
}

export const SelectSetting: FC<SelectSettingProps> = ({
  control,
  settingFieldName,
}) => {
  const { items, toggleItem } = useSelectFormControl(control, settingFieldName);

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
