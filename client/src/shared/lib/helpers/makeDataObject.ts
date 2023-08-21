import type { ChangedData } from '@shared/api/interfaces';
import type { Setting } from '@entities/setting/model';

export function makeDataObject(args: {
  settingName: Setting;
  changedData: ChangedData;
}) {
  const { settingName, changedData } = args;
  return { [settingName]: changedData };
}
