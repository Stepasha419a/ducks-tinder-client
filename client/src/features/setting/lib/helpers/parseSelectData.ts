import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectItem,
} from '@/entities/setting/model';

export function parseSelectData(data: MultiSelectForm) {
  return Object.keys(data.input).reduce((res, key) => {
    const extracted = data.input[key as ProfileSettingSelectName];
    let value = null;
    if (extracted !== null) {
      value = extracted.map((item: SelectItem) => item.name);
    }

    return {
      ...res,
      [key]: value,
    };
  }, {});
}
