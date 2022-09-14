import mongoose from "mongoose";

export interface MessageInterface{
    id: string
    content: string
    username: string
}

export interface MemberInterface{
    id: string,
    name: string
}

export interface IDialog{
    _id: string
    messages: MessageInterface[]
    members: String[]
}

const DialogSchema = new mongoose.Schema({
    messages: {type: [] as MessageInterface[]},
    members: {type: [] as MemberInterface[]}
})

export default mongoose.model('Dialog', DialogSchema)