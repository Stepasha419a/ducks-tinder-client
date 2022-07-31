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