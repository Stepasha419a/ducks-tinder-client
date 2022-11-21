import { picturesInterface } from './../users.interface';
import { IPartnerSettings } from "../users.interface"

export class UpdateUserDto{
    readonly data?: string | number | boolean | IPartnerSettings
    readonly chats?: string[]
    readonly pictures?: picturesInterface
}