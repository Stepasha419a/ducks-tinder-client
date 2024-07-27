import type { SyntheticEvent } from 'react';
import { defaultDuck } from '@shared/ui';

// uses for <img /> when onError is triggered
export function showDefaultImage(
  event: SyntheticEvent<HTMLImageElement, Event>
) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = defaultDuck;
}
