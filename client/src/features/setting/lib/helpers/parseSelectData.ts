import type {
  MultiSelectForm,
  ProfileSettingSelectName,
  SelectItem,
} from '@/entities/setting/model';

export function parseSelectData(data: MultiSelectForm) {
  return Object.keys(data.input).reduce((res, key) => {
    const extracted = data.input[key as ProfileSettingSelectName];
    const value = getValueFromExtracted(extracted);

    return {
      ...res,
      [key]: value,
    };
  }, {});
}

function getValueFromExtracted(
  extracted: SelectItem | SelectItem[] | null
): string | string[] | null {
  let value = null;
  if (Array.isArray(extracted)) {
    value = extracted.map((item: SelectItem) => item.name);
  } else if (extracted !== null) {
    value = extracted.name;
  }
  return value;
}
