import UserModel, {partnerSettingsInterface} from "../models/user-model";
import bcrypt from 'bcryptjs'
import {v4} from 'uuid'
import UserDto from "../dtos/userDto";
import {sendMail} from "./MailService";
import tokenService from "./TokenService";
import userModel from "../models/user-model";
import ApiError from "../exceptions/api-error";
import fileService from "./fileService";

interface userDataInterface {
    _id: string
    refreshToken: string
}

class ChatService{
    async registration(email: string, name: string, nickname: string, password: string, age: number, sex: string, partnerSettings: partnerSettingsInterface) {
        const candidate = await UserModel.findOne({email})
        if(candidate) {
            throw ApiError.BadRequest(`The user with such an email already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 7)
        const activationLink = v4()

        if(!partnerSettings) partnerSettings = {place: 'unknown', distance: 0, usersOnlyInDistance: false, preferSex: 'unknown', age: {from: 18, to: 24}}
        
        const pictures = {
            avatar: '',
            gallery: [] as string[]
        }

        const user = await UserModel.create({email, name, nickname, password: hashPassword, age, sex, partnerSettings, pictures, activationLink})

        fileService.makeUserDir(user._id.toString())

        await sendMail(email, `${(process.env.API_URL)}/api/activate/${activationLink}`, name)
            .catch(() => {
                throw ApiError.BadRequest(`This email doesn't exist`)
            })

        const userDto = new UserDto(user) //id, email, isActivated...
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

export default new ChatService()