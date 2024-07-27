import { WithErrorFallback } from '@shared/lib';

import { ChatProfilePopup as ChatProfilePopupRaw } from './ChatProfilePopup';
import { Messages as MessagesRaw } from './Messages';
import { Nav as NavRaw } from './Nav';
import { Pairs as PairsRaw } from './Pairs';
import { PlaceSetting as PlaceSettingRaw } from './PlaceSetting';
import { ProfileEdit as ProfileEditRaw } from './ProfileEdit';
import { ProfilePreview as ProfilePreviewRaw } from './ProfilePreview';
import { ProfileSettingBlock as ProfileSettingBlockRaw } from './ProfileSettingBlock';
import { TinderUser as TinderUserRaw } from './TinderUser';

export const ChatProfilePopup = WithErrorFallback(ChatProfilePopupRaw);
export const Messages = WithErrorFallback(MessagesRaw);
export const Nav = WithErrorFallback(NavRaw);
export const Pairs = WithErrorFallback(PairsRaw);
export const PlaceSetting = WithErrorFallback(PlaceSettingRaw);
export const ProfileEdit = WithErrorFallback(ProfileEditRaw);
export const ProfilePreview = WithErrorFallback(ProfilePreviewRaw);
export const ProfileSettingBlock = WithErrorFallback(ProfileSettingBlockRaw);
export const TinderUser = WithErrorFallback(TinderUserRaw);

export * from './pagesLib';
