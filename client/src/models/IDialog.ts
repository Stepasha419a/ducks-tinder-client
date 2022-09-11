interface MessageInterface{
    id: string
    content: string
    author: string
}

export interface IDialog {
    _id: string
    messages: MessageInterface[]
    members: String[]
}