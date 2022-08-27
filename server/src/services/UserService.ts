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
    
    /* async create(user: any, picture: any) {
        const fileName = fileService.saveFile(picture, 'userName')
        const createdUser = await UserModel.create({...user, picture: fileName})

        return createdUser
    
    } */

    async update(user: any) {
        if(!user._id) {
            throw new Error('Id не указан')
        }

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {new: true})

        return updatedUser
    }

    async savePicture(userId: string, pictureFile: any, setting: 'avatar' | 'gallery') {
        if(!userId) throw new Error('Id не указан');
        if(setting != 'avatar' && setting != 'gallery') throw new Error('Setting указан некорректно');

        const fileName = fileService.savePicture(pictureFile, userId, setting)

        const user = await UserModel.findById(userId)

        if(setting === 'avatar') {
            user.pictures.avatar = fileName
        }
        user.pictures.gallery.push(fileName)

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {new: true})
        
        return updatedUser
    }

    async deletePicture(userId: string, pictureName: string, setting: 'avatar' | 'gallery') {
        if(!userId) throw new Error('Id не указан');
        if(setting != 'avatar' && setting != 'gallery') throw new Error('Setting указан некорректно');

        const user = await UserModel.findById(userId)

        if(!user.pictures) throw new Error('Pictures не найдены');
        if(!user.pictures.includes(pictureName)) throw new Error(`Picture с именем ${pictureName} не найдено`);

        const fileName = fileService.deletePicture(pictureName, userId, setting)
        const fileIndex = user.pictures.indexOf(fileName)
        
        user.pictures.splice(fileIndex, 1)

        const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {new: true})
        
        return updatedUser
    }

    async delete(id: string) {
        await fileService.deleteUserDir(id)

        const user = await UserModel.findByIdAndDelete(id)

        return user
    }
}

export default new UserService()