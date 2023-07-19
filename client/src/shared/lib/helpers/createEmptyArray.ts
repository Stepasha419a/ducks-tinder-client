export function createEmptyArray(length: number): undefined[] {
  return [...(new Array(length) as undefined[])];
}
