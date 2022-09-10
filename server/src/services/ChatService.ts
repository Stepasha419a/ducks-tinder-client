import { WebSocketServer } from "ws";
import ApiError from "../exceptions/api-error";
import DialogModel, { IDialog } from "../models/dialog-model";
import UserModel from "../models/user-model";

function broadcastMessage(message: any, wss: WebSocketServer) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

class ChatService{
    async getDialogs(userId: string) {
        if(!userId) {
            throw ApiError.BadRequest(`User ID не указан`)
        }

        const user = await UserModel.findById(userId)
        const dialogs = []

        user.dialogs.forEach(async (dialogId: IDialog) => {
            const dialog = await UserModel.findById(dialogId)
            dialogs.push(dialog)
        })
    }

    async getDialog(dialogId: string) {
        if(!dialogId) {
            throw ApiError.BadRequest(`Dialog ID не указан`)
        }
        const dialog = await DialogModel.findById(dialogId)
        .catch(() => {throw ApiError.BadRequest(`Dialog не найден`)})
        return dialog
    }
    
    async createDialog(members: string[]) {
        const dialogCandidate = await DialogModel.findOne({members})
        const dialogCandidateReverseIDs = await DialogModel.findOne({members: members.reverse()})
        if(dialogCandidate || dialogCandidateReverseIDs) {
            throw ApiError.BadRequest(`The dialog with such members already exists`)
        }

        const response = await DialogModel.create({members})

        members.forEach(async (id) => {
            const user = await UserModel.findById(id)
            await UserModel.findByIdAndUpdate(id, {dialogs: [...user.dialogs, response._id]}, {new: true})
        })

        return response
    }

    async connect(wss: WebSocketServer, dialogId: string) {
        wss.on('connection', (ws) => {
            ws.on('message', async (message: any) => {
                message = JSON.parse(message)
                
                switch (message.event) {
                    case 'message':
        
                        const dialog = await DialogModel.findById(dialogId)
                            .catch(() => {throw ApiError.BadRequest(`Dialog не найден`)})

                        await DialogModel.findByIdAndUpdate(dialogId, {messages: [...dialog.messages, message]}, {new: true})

                        broadcastMessage(message, wss)
                        break;
                    case 'connection':
        
                        broadcastMessage(message, wss)
                        break;
                    default:
                        break;
                }
            })
        })
    }

    async deleteDialog(dialogId: string) {
        const response = await DialogModel.findByIdAndDelete(dialogId)

        response.members.forEach(async (id: string) => {
            const user = await UserModel.findById(id)
            const index = user.dialogs.find((item: any) => item === dialogId)
            user.dialogs.splice(index, 1)
            await UserModel.findByIdAndUpdate(id, {dialogs: user.dialogs}, {new: true})
        })

        return response
    }
}

export default new ChatService()