import {
  User,
  PartnerSettings,
  ChangedData,
  InnerObjectName,
} from '../../models/User/User';

export function makeDataObject(args: {
  currentUser: User;
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
