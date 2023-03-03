import { PreferAge, User } from "../../../models/User";

export interface Sorts {
    distance: number,
    age: PreferAge,
    photos: number,
    interests: string[],
    account: string[]  
}

export const sortItemBySettings = (item: User, sortSettings: Sorts) => {
    for (const sortKey in sortSettings) {
        let result = sortPair(item, sortKey, sortSettings)
        if(!result) {
            return false
        }
    }
    return true
}

const sortPair = (item: User, sortKey: string, sortSettings: Sorts) => {
    switch (sortKey) {
        case 'distance':
            if(item.partnerSettings.distance > sortSettings.distance) {
                return false
            }
            return true
        case 'age':
            if(item.age < sortSettings.age.from || item.age > sortSettings.age.to) {
                return false
            }
            return true
        case 'photos':
            const userPhotosCount = 1 + item.pictures.gallery.length
            if(userPhotosCount < sortSettings.photos) {
                return false
            }
            return true
        case 'account':
            for(let accountSetting of sortSettings.account) {
                if(accountSetting === 'have interests' && !item.interests.length) {
                    return false
                }
                if(accountSetting === 'identify confirmed' && !item.isActivated) {
                    return false
                }
            }
            return true
        default:
            for(let interest of sortSettings.interests) {
                if(!item.interests.includes(interest)) {
                    return false
                }
            }
            return true
    }
}