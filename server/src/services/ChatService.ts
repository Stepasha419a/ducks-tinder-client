import ApiError from "../exceptions/api-error";
import DialogModel, { IDialog, MessageInterface } from "../models/dialog-model";
import UserModel from "../models/user-model";

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
    
    async sendMessage(username: string, dialogId: string, message: string) {
        const dialog = await DialogModel.findById(dialogId)
            .catch(() => {throw ApiError.BadRequest(`Dialog не найден`)})

        const newMessage: MessageInterface = {
            id: Date.now().toString(),
            content: message,
            username
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

        members.forEach(async (id) => {
            const user = await UserModel.findById(id)
            await UserModel.findByIdAndUpdate(id, {dialogs: [...user.dialogs, response._id]}, {new: true})
        })

        return response
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