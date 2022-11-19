export interface IMessage{
    id: string
    content: string
    userId: string
    username: string
}

export interface IChat {
    _id: string
    messages: IMessage[]
    members: string[]
}