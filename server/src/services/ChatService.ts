import ApiError from "../exceptions/api-error";
import DialogModel, { IDialog, MessageInterface } from "../models/dialog-model";
import UserModel from "../models/user-model";

class ChatService{
    async getDialogs(userId: string) {
        if(!userId) {
            throw ApiError.BadRequest(`User ID не указан`)
        }

        const user = await UserModel.findById(userId)
        const dialogs = [] as IDialog[]

        for await (let dialogId of user.dialogs) {
            const dialog = await DialogModel.findById(dialogId)
            dialogs.push({_id: dialog._id.toString(), messages: dialog.messages, members: dialog.members})
        }

        return dialogs
    }

    async getDialog(dialogId: string) {
        if(!dialogId) {
            throw ApiError.BadRequest(`Dialog ID не указан`)
        }
        const dialog = await DialogModel.findById(dialogId)
        .catch(() => {throw ApiError.BadRequest(`Dialog не найден`)})
        return dialog
    }
    
    async sendMessage(dialogId: string, message: string, userId: string) {
        const dialog = await DialogModel.findById(dialogId)
            .catch(() => {throw ApiError.BadRequest(`Dialog не найден`)})

        const newMessage: MessageInterface = {
            id: Date.now().toString(),
            content: message,
            userId
        }

        await DialogModel.findByIdAndUpdate(dialogId, {messages: [...dialog.messages, newMessage]}, {new: true})
    }
    
    async createDialog(members: string[]) {
        const dialogCandidate = await DialogModel.findOne({members})
        const dialogCandidateReverseIDs = await DialogModel.findOne({members: members.reverse()})
        if(dialogCandidate || dialogCandidateReverseIDs) {
            throw ApiError.BadRequest(`The dialog with such members already exists`)
        }

        const response = await DialogModel.create({members})

        members.forEach(async (memberId) => {
            const user = await UserModel.findById(memberId)
            await UserModel.findByIdAndUpdate(memberId, {dialogs: [...user.dialogs, response._id.toString()]}, {new: true})
        })

        return response
    }

    async deleteDialog(dialogId: string) {
        const response = await DialogModel.findByIdAndDelete(dialogId)

        response.members.forEach(async (memberId: string) => {
            const user = await UserModel.findById(memberId)
            const index = user.dialogs.find((item: any) => item === dialogId)
            user.dialogs.splice(index, 1)
            await UserModel.findByIdAndUpdate(memberId, {dialogs: user.dialogs}, {new: true})
        })

        return response
    }
}

export default new ChatService()