import { imageInterface } from "../components/Profile/ProfileImageChange/ProfileChangeImage"

export interface IUser {
    _id: string
    email: string
    name: string
    description: string
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
    description?: string
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

export const interestsList = ['fighting', 'ski', 'football', 'volleyball', 'tennis', 'ping pong',
    'swimming', 'karting', 'horse ridding', 'hunting', 'fishing', 'skateboarding', 'bicycle', 'running',
    'surfing', 'snowboarding', 'shooting', 'parachuting', 'paintball', 'bowling', 'billiard', 'skates', 
    'dancing', 'cosplay', 'ballet', 'room quest', 'fitness', 'yoga', 'meditation', 'tourism', 'traveling',
    'hiking', 'camping', 'cars', 'education', 'foreign languages', 'cards', 'poker', 'chess', 'checkers',
    'nard', 'psychology', 'table games', 'sport', 'blogging', 'computer games', 'programming', 'drawing',
    '3D drawing', 'gardener', 'animals', 'volunteering', 'serials', 'books', 'movies', 'cinema', 'food',
    'cooking', 'photo', 'design', 'writing', 'music', 'handmade']

export const potentialFields = ['description', 'sex', 'interests', 'place', 'distance', 'preferSex']

export const makeUserObject = (args: {currentUser: IUser | any, inputName: string, changedData: String | Number | Boolean | String[] | {from: number, to: number}, innerObjectName?: string}) => {
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