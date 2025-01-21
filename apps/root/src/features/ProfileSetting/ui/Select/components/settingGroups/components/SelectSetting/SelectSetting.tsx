import { ListItemButton } from '@ducks-tinder-client/ui';
import classNames from 'classnames';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { useSelectFormControl } from '@features/ProfileSetting';
import type {
  MultiSelectForm,
  ProfileSettingSelectNameEnum,
} from '@entities/user';
import styles from './SelectSetting.module.scss';

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
            <ListItemButton
              onClick={() => toggleItem(selectItem)}
              isActive={isActive}
              key={selectItem}
              extraClassName={cn}
              type="button"
            >
              {selectItem}
            </ListItemButton>
          );
        })}
      </div>
    </>
  );
};
