import { CheckboxInput, Theme, useThemeContext } from '@ducks-tinder-client/ui';
import { SettingThumbnail } from '@entities/user';

export const SwitchThemeThumbnail = () => {
  const { theme, setTheme } = useThemeContext();

  const isChecked = theme === 'dark';

  const handleChange = () => {
    setTheme(!isChecked ? Theme.Dark : Theme.Light);
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
