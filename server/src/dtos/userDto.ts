import { partnerSettings } from "../models/user-model"

export interface UserDtoInterface {
    email: string
    name: string
    nickname: string
    _id: string
    isActivated: boolean
    age: number
    sex: string
    partnerSettings: partnerSettings
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

    constructor(model: UserDtoInterface) {
        this.email = model.email
        this.name = model.name
        this.nickname = model.nickname
        this._id = model._id
        this.isActivated = model.isActivated
        this.age = model.age
        this.sex = model.sex
        this.partnerSettings = model.partnerSettings
    }

}