import mongoose from "mongoose";

export interface partnerSettingsInterface{
    place: String
    distance: Number
    usersOnlyInDistance: Boolean
    preferSex: 'male' | 'female' | 'unknown'
    age: {
        from: Number
        to: Number
    } | 'unknown'
}

export interface picturesInterface{
    avatar: string
    gallery: string[]
}
const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true, default: 'Unnamed user'},
    nickname: {type: String},
    picture: {type: String},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    age: {type: Number},
    sex: {type: String},
    partnerSettings: {type: {} as partnerSettingsInterface},
    pictures: {type: {} as picturesInterface},
    dialogs: {type: [] as string[], default: []}
})

export default mongoose.model('User', UserSchema)