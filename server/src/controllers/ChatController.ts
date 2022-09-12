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

    async sendMessage(req: any, res: any, next: NextFunction) {
        try {
            const {dialogId, message} = req.body


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

    async disconnect(req: any, res: any, next: NextFunction) {
        try {
            
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

/* wss.on('connection', (ws, req) => {
    console.log(req.url)
    ws.on('message', (message: any) => {
        message = JSON.parse(message)
        
        switch (message.event) {
            case 'message':

                broadcastMessage(message)
                break;
            case 'connection':

                broadcastMessage(message)
                break;
            default:
                break;
        }
    })
})

function broadcastMessage(message: any) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
} */

export default new ChatController()