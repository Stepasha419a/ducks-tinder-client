import { partnerSettingsInterface, picturesInterface } from "../models/user-model"

export interface UserDtoInterface {
    email: string
    name: string
    nickname: string
    _id: string
    isActivated: boolean
    age: number
    sex: string
    partnerSettings: partnerSettingsInterface
    pictures: picturesInterface
    dialogs: string[]
}

export default class UserDto { // Data transfer object
    email
    name
    nickname
    _id
    isActivated
    age
    sex
    partnerSettings
    pictures
    dialogs

    constructor(model: UserDtoInterface) {
        this.email = model.email
        this.name = model.name
        this.nickname = model.nickname
        this._id = model._id
        this.isActivated = model.isActivated
        this.age = model.age
        this.sex = model.sex
        this.partnerSettings = model.partnerSettings
        this.pictures = model.pictures
        this.dialogs = model.dialogs
    }

}