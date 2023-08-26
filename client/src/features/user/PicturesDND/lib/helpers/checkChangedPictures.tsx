import type { Picture } from '@shared/api/interfaces';

export function checkChangedPictures(pictures: Picture[]): boolean {
  let isChanged = false;
  for (let i = 0; i < pictures.length; i++) {
    if (pictures[i].order !== i) {
      isChanged = true;
      break;
    }
  }
  return isChanged;
}
