import type { User, ChangedData } from '@shared/api/interfaces';
import type { Setting } from '@/entities/setting/model';

export function makeDataObject(args: {
  currentUser: User;
  settingName: Setting;
  changedData: ChangedData;
}) {
  const { settingName, changedData } = args;
  return { [settingName]: changedData };
}
