import { defaultDuck } from '@ducks-tinder-client/ui';
import type { SyntheticEvent } from 'react';

// uses for <img /> when onError is triggered
export function showDefaultImage(
  event: SyntheticEvent<HTMLImageElement, Event>
) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = defaultDuck;
}
