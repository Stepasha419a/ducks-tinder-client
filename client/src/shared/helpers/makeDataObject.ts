import type {
  User,
  ChangedData,
  InnerObjectName,
} from '@shared/api/interfaces';

export function makeDataObject(args: {
  currentUser: User;
  inputName: string;
  changedData: ChangedData;
  innerObjectName?: InnerObjectName;
}) {
  const { inputName, changedData } = args;
  return { [inputName]: changedData };
}
