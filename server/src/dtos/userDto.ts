import { partnerSettings } from "../models/user-model"

export interface UserModelInterface {
    email: string
    name: string
    _id: string
    isActivated: boolean
    age: number
    sex: string
    partnerSettings: partnerSettings
}

export interface UserDtoInterface {
    email: string
    name: string
    id: string
    isActivated: boolean
    age: number
    sex: string
    partnerSettings: partnerSettings
}

export default class UserDto { // Data transfer object
    email
    name
    id
    isActivated
    age
    sex
    partnerSettings

    constructor(model: UserModelInterface) {
        this.email = model.email
        this.name = model.name
        this.id = model._id
        this.isActivated = model.isActivated
        this.age = model.age
        this.sex = model.sex
        this.partnerSettings = model.partnerSettings
    }

}