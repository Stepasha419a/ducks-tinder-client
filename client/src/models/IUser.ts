export interface IUser {
    id: string
    email: string
    name: string
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
    _id: string // _ID because server required _id value as id value equals
    email?: string
    name?: string
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

export const makeUserObject = (args: {currentUser: IUser | any, inputName: string, changedData: String | Number, innerObjectName?: string}) => {
    const {currentUser, inputName, changedData, innerObjectName} = args
    
    if(innerObjectName) {
        return {_id: currentUser.id, [innerObjectName]: {...currentUser[innerObjectName] as IUser, [inputName]: changedData}}
    }
    return {_id: currentUser.id, [inputName]: changedData}
}