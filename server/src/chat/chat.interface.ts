export interface IMessage{
    id: string
    content: string
    userId: string
}

export interface IChat{
    _id: string
    messages: IMessage[]
    members: String[]
}

export interface ISendMessage{
    username: string
    content: string,
    userId: string
}