import { partnerSettingsInterface, picturesInterface } from "../models/user-model"

export interface UserDtoInterface {
    email: string
    name: string
    description: string
    nickname: string
    _id: string
    isActivated: boolean
    age: number
    sex: string
    interests: string[]
    partnerSettings: partnerSettingsInterface
    pictures: picturesInterface
    dialogs: string[]
    pairs: string[]
    checkedUsers: string[]
}

export default class UserDto { // Data transfer object
    email
    name
    description
    nickname
    _id
    isActivated
    age
    sex
    interests
    partnerSettings
    pictures
    dialogs
    pairs
    checkedUsers

    constructor(model: UserDtoInterface) {
        this.email = model.email
        this.name = model.name
        this.description = model.description
        this.nickname = model.nickname
        this._id = model._id
        this.isActivated = model.isActivated
        this.age = model.age
        this.sex = model.sex
        this.interests = model.interests
        this.partnerSettings = model.partnerSettings
        this.pictures = model.pictures
        this.dialogs = model.dialogs
        this.pairs = model.pairs
        this.checkedUsers = model.checkedUsers
    }

}