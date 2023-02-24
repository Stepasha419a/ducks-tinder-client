import { IUser, PartnerSettings } from '../../../models/IUser';
import {
  ChangedData,
  InnerObjectName,
} from '../../settings/settings.interfaces';

export function makeDataObject(args: {
  currentUser: IUser | any;
  inputName: string;
  changedData: ChangedData;
  innerObjectName?: InnerObjectName;
}) {
  const { currentUser, inputName, changedData, innerObjectName } = args;

  if (innerObjectName) {
    return {
      [innerObjectName]: {
        ...currentUser[innerObjectName],
        [inputName as keyof PartnerSettings]: changedData,
      },
    };
  }
  return { [inputName]: changedData };
}
