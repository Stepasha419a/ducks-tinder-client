import type { SyntheticEvent } from 'react';
import defaultPhoto from '@shared/assets/images/default-duck.png';

// uses for <img /> when onError is triggered
export function showDefaultImage(
  event: SyntheticEvent<HTMLImageElement, Event>
) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = defaultPhoto;
}
