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

class AuthService{
    async registration(email: string, name: string, nickname: string, password: string, age: number, sex: string, partnerSettings: partnerSettingsInterface) {
        const candidate = await UserModel.findOne({email})
        if(candidate) {
            throw ApiError.BadRequest(`The user with such an email already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 7)
        const activationLink = v4()

        if(!partnerSettings) partnerSettings = {place: '', distance: 0, usersOnlyInDistance: false, preferSex: '', age: {from: 18, to: 24}}
        
        const description = ''
        const interests = [] as string[]
        const dialogs = [] as string[]
        const pictures = {
            avatar: '',
            gallery: [] as string[]
        }
        const pairs = [] as string[]

        const user = await UserModel.create({email, name, description, nickname, password: hashPassword, age, sex, interests, partnerSettings, pictures, dialogs, pairs, activationLink})

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

    async login(email: string, password: string) {
        const user = await UserModel.findOne({email})
        if(!user) {
            throw ApiError.BadRequest(`The user with such an email is not found`)
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals) {
            throw ApiError.BadRequest(`Incorrect password`)
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return {...tokens, user: userDto}

    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async activate(activationLink: string) {
        const user = await UserModel.findOne({activationLink})
        if(!user) {
            throw ApiError.BadRequest(`Incorrect activation link`)
        }
        user.isActivated = true
        await user.save()
    }
    
    async refresh(refreshToken: string) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken) as userDataInterface
        const tokenFromDb = await tokenService.findToken(refreshToken)
        
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await userModel.findById(userData._id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto._id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

export default new AuthService()