import type {
  InnerObjectName,
  SettingInputName,
} from '@shared/api/interfaces/User/User';
import type { ErrorField, Setting, Validation } from '@shared/interfaces';

export interface SettingsInitialState {
  setting: Setting;
  settingInputName: SettingInputName;
  innerObjectName: InnerObjectName;
  isUserInfoSetting: boolean;
  validation: Validation | null;
  formName: string | null;
  errorFields: ErrorField[];
}

export interface SetInputPayload {
  inputName: SettingInputName;
  formName?: string;
  innerObjectName?: InnerObjectName;
  validation?: Validation | null;
}
