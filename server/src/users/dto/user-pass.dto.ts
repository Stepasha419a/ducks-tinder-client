import { IUserPassDto } from "../users.interface"

export class UserPassDto{
    _id
    email

    constructor(model: IUserPassDto) {
        this._id = model._id
        this.email = model.email
    }
}