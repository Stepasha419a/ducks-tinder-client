export interface UserModelInterface {
    email: string
    name: string
    _id: string
    isActivated: boolean
}

export interface UserDtoInterface {
    email: string
    name: string
    id: string
    isActivated: boolean
}

export default class UserDto { // Data transfer object
    email
    name
    id
    isActivated

    constructor(model: UserModelInterface) {
        this.email = model.email
        this.name = model.name
        this.id = model._id
        this.isActivated = model.isActivated
    }

}