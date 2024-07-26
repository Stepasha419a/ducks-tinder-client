import { WithErrorFallback } from '@shared/lib';

import { ChatProfilePopup as ChatProfilePopupRaw } from './ChatProfilePopup/ui/ChatProfilePopup';
import { Messages as MessagesRaw } from './Messages/ui/Messages';
import { Nav as NavRaw } from './Nav/Nav';
import { Pairs as PairsRaw } from './Pairs/ui/Pairs';
import { PlaceSetting as PlaceSettingRaw } from './PlaceSetting/ui/PlaceSetting';
import { ProfileEdit as ProfileEditRaw } from './ProfileEdit/ProfileEdit';
import { ProfilePreview as ProfilePreviewRaw } from './ProfilePreview/ui/ProfilePreview';
import { ProfileSettingBlock as ProfileSettingBlockRaw } from './ProfileSettingBlock/ui/ProfileSettingBlock';
import { TinderUser as TinderUserRaw } from './TinderUser/ui/TinderUser';

export const ChatProfilePopup = WithErrorFallback(ChatProfilePopupRaw);
export const Messages = WithErrorFallback(MessagesRaw);
export const Nav = WithErrorFallback(NavRaw);
export const Pairs = WithErrorFallback(PairsRaw);
export const PlaceSetting = WithErrorFallback(PlaceSettingRaw);
export const ProfileEdit = WithErrorFallback(ProfileEditRaw);
export const ProfilePreview = WithErrorFallback(ProfilePreviewRaw);
export const ProfileSettingBlock = WithErrorFallback(ProfileSettingBlockRaw);
export const TinderUser = WithErrorFallback(TinderUserRaw);
