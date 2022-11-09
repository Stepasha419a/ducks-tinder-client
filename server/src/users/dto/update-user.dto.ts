import { IChat } from "src/chat/chat.interface";
import { IPartnerSettings, picturesInterface } from "../users.interface";

export class UpdateUserDto{
    readonly data?: string | number | boolean | IPartnerSettings | IChat
    readonly chats?: IChat[]
    readonly pictures?: picturesInterface
}