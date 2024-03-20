import { useEffect, useRef } from 'react';
import { useSettingUrlNew } from './useSettingUrlNew';
import type { SettingNameEnum } from '../../model/setting';

export function useMemoriedSettingUrl() {
  const setting = useSettingUrlNew();

  const lastExistingValues = useRef<{
    settingName: SettingNameEnum | null;
    formName: string | null;
  }>({ settingName: null, formName: null });

  useEffect(() => {
    if (setting?.formName) {
      lastExistingValues.current.formName = setting.formName;
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (setting?.settingName) {
      lastExistingValues.current.settingName = setting.settingName;
    }
  }, [setting?.formName, setting?.settingName]);

  const settingName = (setting?.settingName ||
    lastExistingValues.current.settingName)!;
  const formName = (setting?.formName || lastExistingValues.current.formName)!;

  return {
    ...setting,
    settingName,
    formName,
  };
}
