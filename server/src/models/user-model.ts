import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true, default: 'Unnamed user'},
    description: {type: String, default: 'No description'},
    picture: {type: String},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
})

export default mongoose.model('User', UserSchema)