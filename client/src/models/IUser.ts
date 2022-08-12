export interface IUser {
    _id: string
    email: string
    name: string
    nickname: string
    age: number
    sex: 'male' | 'female'
    isActivated: boolean
    picture: string
    partnerSettings: {
        place: string
        distance: number
        preferSex: 'male' | 'female'
        age: {
            from: number
            to: number
        }
    }
}

export interface IUserUnrequired {
    _id: string
    email?: string
    name?: string
    nickname?: string
    age?: number
    sex?: 'male' | 'female'
    isActivated?: boolean
    picture?: string
    partnerSettings?: {
        place?: string
        distance?: number
        preferSex?: 'male' | 'female'
        age?: {
            from?: number
            to?: number
        }
    }
}

export const makeUserObject = (args: {currentUser: IUser | any, inputName: string, changedData: String | Number | {from: number, to: number}, innerObjectName?: string}) => {
    const {currentUser, inputName, changedData, innerObjectName} = args
    
    if(innerObjectName) {
        return {_id: currentUser._id, [innerObjectName]: {...currentUser[innerObjectName] as IUser, [inputName]: changedData}}
    }
    return {_id: currentUser._id, [inputName]: changedData}
}