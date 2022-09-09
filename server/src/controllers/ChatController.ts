import { NextFunction } from 'express'
import ws from 'ws'
import chatService from '../services/ChatService'

class ChatController{
    async createDialog(req: any, res: any, next: NextFunction) {
        try {
            const members = req.body

            const response = await chatService.createDialog(members)
            return res.json(response)
        } catch (error) {
            next(error)
        } 
    }

    async connect(req: any, res: any, next: NextFunction) {
        try {
            
        } catch (error) {
            next(error)
        }
    }

    async disconnect() {

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

const wss = new ws.Server({
    port: process.env.WSPORT as number | undefined,
}, () => console.log(`WS Server started on port ${process.env.WSPORT}`))

wss.on('connection', (ws) => {
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
}

export default new ChatController()