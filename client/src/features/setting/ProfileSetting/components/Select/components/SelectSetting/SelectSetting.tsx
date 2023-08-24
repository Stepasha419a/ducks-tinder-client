import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import type {
  MultiSelectForm,
  ProfileSettingSelectName,
} from '@/entities/setting/model';
import styles from './SelectSetting.module.scss';
import { ListItem } from '@/shared/ui';
import { useSelectFormControl } from '@/features/setting/lib/hooks';
import classNames from 'classnames';

interface SelectSettingProps {
  control: Control<MultiSelectForm>;
  settingFieldName: ProfileSettingSelectName;
}

export const SelectSetting: FC<SelectSettingProps> = ({
  control,
  settingFieldName,
}) => {
  const { list, items, toggleItem, validation, isValid } = useSelectFormControl(
    control,
    settingFieldName
  );

  return (
    <>
      <div className={styles.subhead}>
        <div className={styles.title}>{settingFieldName}</div>
        <div className={styles.limit}>
          ({items.length}/{validation.maxLength})
        </div>
      </div>
      <div className={styles.items}>
        {list.map((selectItem) => {
          const isActive = items.some((item) => selectItem === item.name);
          return (
            <ListItem
              onClick={() => toggleItem({ name: selectItem })}
              isActive={isActive}
              pointer
              key={selectItem}
              extraClassName={classNames(
                styles.item,
                isActive && styles.active,
                !isValid && styles.disabled
              )}
            >
              {selectItem}
            </ListItem>
          );
        })}
      </div>
    </>
  );
};
