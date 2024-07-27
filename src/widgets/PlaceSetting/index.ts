import { WithErrorFallback } from '@shared/lib';
import { PlaceSetting as PlaceSettingRaw } from './ui/PlaceSetting';

export const PlaceSetting = WithErrorFallback(PlaceSettingRaw);
