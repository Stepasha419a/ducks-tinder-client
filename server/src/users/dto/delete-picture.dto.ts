export class DeletePictoreDto{
    readonly userId: string 
    readonly pictureName: string
    readonly setting: 'avatar' | 'gallery'
}