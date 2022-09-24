export interface MessageInterface{
    id: string
    content: string
    userId: string
}

export interface IDialog {
    _id: string
    messages: MessageInterface[]
    members: string[]
}