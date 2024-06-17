import { WithErrorFallback } from '@shared/lib/hocs';

import { ChatProfilePopup as ChatProfilePopupRaw } from './ChatProfilePopup/ChatProfilePopup';
import { Messages as MessagesRaw } from './Messages/Messages';
import { Nav as NavRaw } from './Nav/Nav';
import { Pairs as PairsRaw } from './Pairs/Pairs';
import { PlaceSetting as PlaceSettingRaw } from './PlaceSetting/PlaceSetting';
import { ProfilePreview as ProfilePreviewRaw } from './ProfilePreview/ProfilePreview';
import { ProfileSettingBlock as ProfileSettingBlockRaw } from './ProfileSettingBlock/ProfileSettingBlock';
import { TinderUser as TinderUserRaw } from './TinderUser/TinderUser';

export const ChatProfilePopup = WithErrorFallback(ChatProfilePopupRaw);
export const Messages = WithErrorFallback(MessagesRaw);
export const Nav = WithErrorFallback(NavRaw);
export const Pairs = WithErrorFallback(PairsRaw);
export const PlaceSetting = WithErrorFallback(PlaceSettingRaw);
export const ProfilePreview = WithErrorFallback(ProfilePreviewRaw);
export const ProfileSettingBlock = WithErrorFallback(ProfileSettingBlockRaw);
export const TinderUser = WithErrorFallback(TinderUserRaw);
