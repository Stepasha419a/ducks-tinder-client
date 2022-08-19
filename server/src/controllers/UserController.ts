import { NextFunction } from "express"
import userService from "../services/UserService"

class UserController{

    async getUsers(req: any, res: any, next: NextFunction) {
        try {
            const users = await userService.getAll()

            res.json(users)

        } catch (error: any) {
            next(error)
        }
    }

    async getOne(req: any, res: any, next: NextFunction) {
        try {
            const user = await userService.getOne(req.params.id)
    
            return res.json(user)
    
        } catch (error: any) {
            next(error)
        }
    }

    async update(req: any, res: any, next: NextFunction) {
        try {
            const updatedUser = await userService.update(req.body)
    
            return res.json(updatedUser)
    
        } catch (error: any) {
            next(error)
        }
    }

    async delete(req: any, res: any, next: NextFunction) {
        try {
            const user = await userService.delete(req.params.id)
    
            res.json(user)
    
        } catch (error: any) {
            next(error)
        }
    }

    async savePicture(req: any, res: any, next: NextFunction) {
        try {
            const { userId } = req.body
            const pictureFile = req.files.file
            const user = await userService.savePicture(userId, pictureFile)
    
            res.json(user)

        } catch (error: any) {
            next(error)
        }
    }

    async deletePicture(req: any, res: any, next: NextFunction) {
        try {
            const { userId, pictureName } = req.body
            const user = await userService.deletePicture(userId, pictureName)
    
            res.json(user)
            
        } catch (error: any) {
            next(error)
        }
    }
}

export default new UserController()