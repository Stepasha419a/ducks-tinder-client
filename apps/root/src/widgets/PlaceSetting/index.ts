import { WithErrorFallback } from '@ducks-tinder-client/common';

import { PlaceSetting as PlaceSettingRaw } from './ui/PlaceSetting';

export const PlaceSetting = WithErrorFallback(PlaceSettingRaw);
