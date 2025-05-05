import type {
  MultiSelectForm,
  ProfileSettingSelectNameEnum,
} from '@entities/user';

export function parseSelectData(data: MultiSelectForm) {
  return Object.keys(data.input).reduce((res, key) => {
    const extracted = data.input[key as ProfileSettingSelectNameEnum];
    const value = getValueFromExtracted(extracted);

    return {
      ...res,
      [key]: value,
    };
  }, {});
}

function getValueFromExtracted(
  extracted: string | string[] | null
): string | string[] | null {
  let value = null;
  if (Array.isArray(extracted)) {
    value = extracted.map((item: string) => item);
  } else if (extracted !== null) {
    value = extracted;
  }
  return value;
}
