import { imageInterface } from "../components/Profile/ProfileImageChange/ProfileChangeImage"

export interface IUser {
    _id: string
    email: string
    name: string
    nickname: string
    age: number
    sex: 'male' | 'female'
    isActivated: boolean
    interests: string[]
    partnerSettings: {
        place: string
        distance: number
        usersOnlyInDistance: boolean
        preferSex: 'male' | 'female'
        age: {
            from: number
            to: number
        }
    }
    pictures: {
        avatar: string
        gallery: string[]
    }
    dialogs: string[]
    pairs: []
}

export interface IUserUnrequired {
    _id: string
    email?: string
    name?: string
    nickname?: string
    age?: number
    sex?: 'male' | 'female'
    isActivated?: boolean
    interests?: string[]
    pictures?: {
        avatar?: string
        gallery?: string[]
    }
    partnerSettings?: {
        place?: string
        distance?: number
        usersOnlyInDistance?: boolean
        preferSex?: 'male' | 'female'
        age?: {
            from?: number
            to?: number
        }
    }
    dialogs?: string[]
}

export const makeUserObject = (args: {currentUser: IUser | any, inputName: string, changedData: String | Number | Boolean | {from: number, to: number}, innerObjectName?: string}) => {
    const {currentUser, inputName, changedData, innerObjectName} = args
    
    if(innerObjectName) {
        return {_id: currentUser._id, [innerObjectName]: {...currentUser[innerObjectName] as IUser, [inputName]: changedData}}
    }
    return {_id: currentUser._id, [inputName]: changedData}
}

export const makeUserImagesObject = (args: {currentUser: IUser, images: imageInterface[]}) => {
    const {currentUser, images} = args
    const parsedImages = images.map(image => image.image)

    return{_id: currentUser._id, pictures: {avatar: parsedImages[0], gallery: parsedImages.slice(1)}}
}