export function getIsProfilePage(pathname: string): boolean {
  return /^\/(profile|settings)\/?.*/.test(pathname);
}
