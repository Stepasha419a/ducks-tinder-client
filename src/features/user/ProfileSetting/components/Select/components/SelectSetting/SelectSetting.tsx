import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import styles from './SelectSetting.module.scss';
import { ListItem } from '@shared/ui';
import { useSelectFormControl } from '@features/user/lib/hooks';
import classNames from 'classnames';
import type {
  MultiSelectForm,
  ProfileSettingSelectNameEnum,
} from '@/entities/user/lib';

interface SelectSettingProps {
  control: Control<MultiSelectForm>;
  settingFieldName: ProfileSettingSelectNameEnum;
}

export const SelectSetting: FC<SelectSettingProps> = ({
  control,
  settingFieldName,
}) => {
  const {
    title,
    list,
    items,
    toggleItem,
    validation,
    isValid,
    getIsActive,
    activeLength,
  } = useSelectFormControl(control, settingFieldName);

  return (
    <>
      <div className={styles.subhead}>
        <div className={styles.title}>{title}</div>
        <div className={styles.limit}>
          ({activeLength}/{validation.maxLength})
        </div>
      </div>
      <div className={styles.items}>
        {list.map((selectItem) => {
          const isActive = getIsActive(items, selectItem);
          const cn = classNames(
            styles.item,
            isActive && styles.active,
            !isValid && styles.disabled
          );

          return (
            <ListItem
              onClick={() => toggleItem(selectItem)}
              isActive={isActive}
              pointer
              key={selectItem}
              extraClassName={cn}
            >
              {selectItem}
            </ListItem>
          );
        })}
      </div>
    </>
  );
};
