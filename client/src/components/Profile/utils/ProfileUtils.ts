import { IUser } from "../../../models/IUser"

export const checkField = (user: IUser, field: string) => {
    switch (field) {
        case 'description':
            if(user.description === '') {
                return 'description'
            }
            return 0
        case 'sex':
            if(user.sex !== 'male' && user.sex !== 'female') {
                return 'sex'
            }
            return 0
        case 'interests':
            if(!user.interests.length) {
                return 'interests'
            }
            return 0
        case 'place':
            if(user.partnerSettings.place === '') {
                return 'place'
            }
            return 0
        case 'distance':
            if(user.partnerSettings.distance === 0) {
                return 'distance'
            }
            return 0
        case 'preferSex':
            if(user.partnerSettings.preferSex !== 'male' && user.partnerSettings.preferSex !== 'female') {
                return 'preferSex'
            }
            return 0
        default:
            break;
    }
}