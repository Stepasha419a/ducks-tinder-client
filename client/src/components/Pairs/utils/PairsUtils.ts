import { IUser } from "../../../models/IUser";

export const sortItemBySettings = (item: IUser, sortSettings: string[]) => {
    let isValid = false
    for (let i = 0; i < sortSettings.length; i++) {
        let result = sortPair(item, sortSettings[i])
        if(!result) {
            isValid = false
            return isValid
        }

        if(i === sortSettings.length - 1) {
            isValid = true
            return isValid
        }
    }
}

const sortPair = (item: IUser, sortSetting: string) => {
    switch (sortSetting) {
        case 'have interests':
            if(item.interests.length) {
                return true
            }
            return false
        default:
            if(item.interests.includes(sortSetting)) {
                return true
            }
            return false
    }
}