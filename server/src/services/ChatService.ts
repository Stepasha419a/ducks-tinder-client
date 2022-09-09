import ApiError from "../exceptions/api-error";
import DialogModel from "../models/dialog-model";
import UserModel from "../models/user-model";

class ChatService{
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