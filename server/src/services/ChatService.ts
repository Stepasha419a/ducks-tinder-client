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

        members.forEach(async (_id) => {
            const user = await UserModel.findById(_id)
            await UserModel.findByIdAndUpdate(_id, {dialogs: [...user.dialogs, response._id]}, {new: true})
        })

        return response
    }
}

export default new ChatService()