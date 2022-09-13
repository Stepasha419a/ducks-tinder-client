interface MessageInterface{
    id: string
    content: string
    username: string
}

export interface IDialog {
    _id: string
    messages: MessageInterface[]
    members: String[]
}