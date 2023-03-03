export class UserSortsDto {
    readonly distance: number
    readonly onlyNear: boolean
    readonly age: number
    readonly preferAge: {from: number, to: number}
    readonly sex: 'male' | 'female'
    readonly preferSex: 'male' | 'female'
    readonly userIds: string[]
}