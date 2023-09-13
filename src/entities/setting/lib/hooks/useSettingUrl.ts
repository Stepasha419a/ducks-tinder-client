import { useAppDispatch } from '@shared/lib/hooks';
import { setInput } from '../../model';
import type {
  SettingName,
  SettingProperties,
} from '../../model/setting.interfaces';
import { useEffect, useRef } from 'react';
import { SETTING_LIST, BUSY_ROUTES } from '../../model/setting.constants';
import { useLocation } from 'react-router-dom';
import { getSettingUrl } from '../helpers';

const settingRegex = /\/settings\/([a-z]+(?:(?:-)(?:[a-z]+))*)/;

export function useSettingUrl(): boolean | null {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isFound = useRef<boolean | null>(null);

  useEffect(() => {
    isFound.current = null;
    const settingName = getSettingUrl(pathname, settingRegex);

    if (settingName && Object.keys(SETTING_LIST).includes(settingName)) {
      isFound.current = true;
      const settingProperties: SettingProperties | null =
        SETTING_LIST[settingName];

      dispatch(
        setInput({
          settingName: settingName as SettingName,
          formName: settingProperties?.formName || settingName,
          validation: settingProperties?.validation,
        })
      );
    } else if (settingName && !BUSY_ROUTES.includes(settingName)) {
      isFound.current = false;
    }
  }, [pathname, dispatch]);

  return isFound.current;
}
