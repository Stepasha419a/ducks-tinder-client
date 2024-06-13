import { SettingThumbnail } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { setTheme } from '@shared/model/theme';
import { CheckboxInput } from '@shared/ui';

export const SwitchThemeThumbnail = () => {
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
      />
    </SettingThumbnail>
  );
};
