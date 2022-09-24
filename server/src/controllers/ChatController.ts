import { NextFunction } from 'express'
import chatService from '../services/ChatService'

class ChatController{
    async getDialogs(req: any, res: any, next: NextFunction) {
        try {
            const userId = req.params.userID 

            const response = await chatService.getDialogs(userId)

            return res.json(response)
        } catch (error) {
            next(error)
        }
    }

    async getDialog(req: any, res: any, next: NextFunction) {
        try {
            const dialogId = req.params.id

            const response = await chatService.getDialog(dialogId)

            return res.json(response)
        } catch (error) {
            next(error)
        }
    }

    async createDialog(req: any, res: any, next: NextFunction) {
        try {
            const members = req.body

            const response = await chatService.createDialog(members)
            return res.json(response)
        } catch (error) {
            next(error)
        } 
    }

    async deleteDialog(req: any, res: any, next: NextFunction) {
        try {
            const dialogId = req.params.id

            const response = await chatService.deleteDialog(dialogId)
            return res.json(response)
        } catch (error) {
            next(error)
        }
    }
}

export default new ChatController()