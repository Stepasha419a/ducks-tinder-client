import { NextFunction } from "express"
import events from 'events'

const emitter = new events.EventEmitter()

class ChatController{

    async connect(req: any, res: any, next: NextFunction) {
        try {
            res.writeHead(200, {
                'Connection': 'keep-alive',
                'Content-type': 'text/event-stream',
                'Cache-Control': 'no-cache'
            })
            emitter.on('sendMessage', (message) => {
                res.write(`data: ${JSON.stringify(message)}\n\n`)
            })
        } catch (error: any) {
            next(error)
        }
    }

    async sendMessage(req: any, res: any, next: NextFunction) {
        try {
            const message = req.body

            emitter.emit('sendMessage', message)
            res.status(200)
        } catch (error: any) {
            next(error)
        }
    }



    /* // Long pulling method
    async getMessages(req: any, res: any, next: NextFunction) {
        try {
            emitter.once('sendMessage', (message) => {
                res.json(message)
            })
        } catch (error: any) {
            next(error)
        }
    }

    async sendMessage(req: any, res: any, next: NextFunction) {
        try {
            const message = req.body

            emitter.emit('sendMessage', message)
            res.status(200)
        } catch (error: any) {
            next(error)
        }
    } */
}

export default new ChatController()