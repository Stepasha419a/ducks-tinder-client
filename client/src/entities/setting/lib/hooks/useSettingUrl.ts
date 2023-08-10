import { useAppDispatch } from '@shared/lib/hooks';
import { setInput } from '../../model';
import type {
  SettingName,
  SettingProperties,
} from '../../model/setting.interfaces';
import { useEffect, useRef } from 'react';
import { SETTING_LIST, BUSY_ROUTES } from '../../model/setting.constants';
import { useLocation } from 'react-router-dom';

export function useSettingUrl(): boolean | null {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isFound = useRef<boolean | null>(null);

  useEffect(() => {
    isFound.current = null;

    const matched = extractSettingName(pathname);
    if (matched?.[1]) {
      const setting = concatenateUrl(matched);
      if (Object.keys(SETTING_LIST).includes(setting)) {
        isFound.current = true;
        const settingProperties: SettingProperties | null =
          SETTING_LIST[setting];
        dispatch(
          setInput({
            settingName: setting as SettingName,
            formName: settingProperties?.formName || setting,
            validation: settingProperties?.validation,
          })
        );
      } else if (!BUSY_ROUTES.includes(setting)) {
        isFound.current = false;
      }
    }
  }, [pathname, dispatch]);

  return isFound.current;
}

function extractSettingName(pathname: string): RegExpMatchArray | null {
  return pathname.match(/\/settings\/([a-z]+)-?([a-z]*)/);
}

function concatenateUrl(matchArr: RegExpMatchArray): string {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return (
    matchArr[1] +
    (matchArr[2] ? matchArr[2][0].toUpperCase() + matchArr[2].slice(1) : '')
  );
}
