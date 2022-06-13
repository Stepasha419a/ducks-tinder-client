import UserModel from "../models/user-model";
import bcrypt from 'bcryptjs'
import {v4} from 'uuid'
import UserDto from "../dtos/userDto";
import tokenService from "./TokenService";
import mailService from "./MailService";
import userModel from "../models/user-model";
import ApiError from "../exceptions/api-error";

interface userDataInterface {
    id: string
    refreshToken: string
}

class AuthService{
    async registration(email: string, name: string, password: string) {
        const candidate = await UserModel.findOne({email})
        if(candidate) {
            throw ApiError.BadRequest(`The user with such an email already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 7)
        const activationLink = v4()

        const user = await UserModel.create({email, name, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${(process.env.API_URL || 'http://localhost:5000')}/api/activate/${activationLink}`, name)
            .catch((error: any) => {
                throw ApiError.BadRequest(`This email doesn't exist`)
            })

        const userDto = new UserDto(user) //id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

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
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

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

        const user = await userModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}

export default new AuthService()