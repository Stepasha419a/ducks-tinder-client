import fileService from "./fileService";
import UserModel from "../models/user-model";

class UserService{

    async getAll() {
        const users = await UserModel.find()

        return users
    }

    async getOne(id: string) {
        if(!id) {
            throw new Error('Id не указан')
        }

        const user = await UserModel.findById(id)
    
        return user
    }
    
    async create(user: any, picture: any) {
        const fileName = fileService.saveFile(picture)
        const createdUser = await UserModel.create({...user, picture: fileName})

        return createdUser
    
    }

    async update(user: any) {
            if(!user._id) {
                throw new Error('Id не указан')
            }
    
            const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {new: true})
    
            return updatedUser
    }

    async delete(id: string) {
        const user = await UserModel.findByIdAndDelete(id)

        return user
    }
}

export default new UserService()