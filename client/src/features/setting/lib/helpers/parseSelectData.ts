import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectItem,
} from '@/entities/setting/model';

export function parseSelectData(data: MultiSelectForm) {
  return Object.keys(data.input).reduce(
    (res, key) => ({
      ...res,
      [key]: data.input[key as ProfileSettingSelectName].map(
        (item: SelectItem) => item.name
      ),
    }),
    {}
  );
}
