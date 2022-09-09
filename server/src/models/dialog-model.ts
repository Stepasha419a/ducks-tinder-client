import mongoose from "mongoose";

interface MessageInterface{
    id: string
    content: string
    author: string
}

const DialogSchema = new mongoose.Schema({
    messages: {type: [] as MessageInterface[]},
    members: {type: [] as String[]}
})

export default mongoose.model('Dialog', DialogSchema)