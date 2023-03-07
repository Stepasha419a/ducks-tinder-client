import { User, PartnerSettings } from '../../../models/User';
import {
  ChangedData,
  InnerObjectName,
} from '../../settings/settings.interfaces';

export function makeDataObject(args: {
  currentUser: User | any;
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