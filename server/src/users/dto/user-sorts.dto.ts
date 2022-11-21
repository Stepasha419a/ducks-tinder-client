export class UserSortsDto {
    readonly distance: number
    readonly onlyNear: boolean
    readonly age: number
    readonly preferAge: {min: number, max: number}
    readonly sex: 'male' | 'female'
    readonly preferSex: 'male' | 'female'
    readonly userIds: string[]
}