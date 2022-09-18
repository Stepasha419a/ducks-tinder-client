export interface MessageInterface{
    id: string
    content: string
    username: string
    userId: string
}

export interface MemberInterface{
    id: string,
    name: string
}

export interface IDialog {
    _id: string
    messages: MessageInterface[]
    members: MemberInterface[]
}