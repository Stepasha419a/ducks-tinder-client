export interface IPartnerSettings{
    place: String
    distance: Number
    usersOnlyInDistance: Boolean
    preferSex: 'male' | 'female' | ''
    age: {
        from: Number
        to: Number
    }
}

export interface picturesInterface{
    avatar: string
    gallery: string[]
}

export interface ISorts {
    distance: number,
    onlyNear: boolean,
    age: number,
    preferAge: {min: number, max: number},
    sex: 'male' | 'female',
    preferSex: 'male' | 'female',
    userIds: string[]
}

export interface IUserDto {
    _id?: string
    email: string
    name: string
    description: string
    nickname: string
    isActivated: boolean
    age: number
    sex: string
    interests: string[]
    partnerSettings: IPartnerSettings
    pictures: picturesInterface
    chats: string[]
    pairs: string[]
    checkedUsers: string[]
}

export interface IUserPassDto{
    _id: string
    email: string
}