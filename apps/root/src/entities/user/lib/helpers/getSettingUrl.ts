export function getSettingUrl(pathname: string, regex: RegExp): string | null {
  const extractedSetting = pathname.match(regex);
  if (!extractedSetting?.[1]) {
    return null;
  }
  const settingName = extractedSetting[1].replaceAll(/-\w/g, (char) => {
    return char[1].toUpperCase();
  });

  return settingName;
}
