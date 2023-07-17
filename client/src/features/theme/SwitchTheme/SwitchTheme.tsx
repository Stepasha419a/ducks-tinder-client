import { SettingThumbnail } from '@entities/setting/components';
import { setTheme } from '@entities/theme/model';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { CheckboxInput } from '@shared/ui';
import styles from './SwitchTheme.module.scss';

export const SwitchTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  const isChecked = theme === 'dark';

  const handleChange = () => {
    dispatch(setTheme(!isChecked ? 'dark' : 'light'));
  };

  return (
    <SettingThumbnail title="Theme">
      <CheckboxInput
        checked={isChecked}
        onChange={handleChange}
        variant="small"
        text="Dark Mode"
        extraClassName={styles.checkbox}
      />
    </SettingThumbnail>
  );
};
