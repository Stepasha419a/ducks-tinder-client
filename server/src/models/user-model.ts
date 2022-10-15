import mongoose from "mongoose";

export interface partnerSettingsInterface{
    place: String
    distance: Number
    usersOnlyInDistance: Boolean
    preferSex: 'male' | 'female' | ''
    age: {
        from: Number
        to: Number
    }
}

export interface picturesInterface{
    avatar: string
    gallery: string[]
}
const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false, default: ''},
    nickname: {type: String},
    picture: {type: String},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    age: {type: Number},
    sex: {type: String},
    interests: {type: [] as string[], default: []},
    partnerSettings: {type: {} as partnerSettingsInterface},
    pictures: {type: {} as picturesInterface},
    dialogs: {type: [] as string[], default: []},
    pairs: {type: [] as string[], default: []},
    checkedUsers: {type: [] as string[], default: []}
})

export default mongoose.model('User', UserSchema)