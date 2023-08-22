function concatenateUrl(matchArr: RegExpMatchArray): string {
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return (
    matchArr[1] +
    (matchArr[2] ? matchArr[2][0].toUpperCase() + matchArr[2].slice(1) : '')
  );
}

export function getSettingUrl(pathname: string, regex: RegExp): string | null {
  const extractedSetting = pathname.match(regex);
  if (!extractedSetting) {
    return null;
  }

  const settingName = concatenateUrl(extractedSetting);
  return settingName;
}
