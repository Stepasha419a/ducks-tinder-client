import { User } from './../users/users.model';
import { LoginUserDto } from './../users/dto/login-user.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'
import {v4} from 'uuid'
import { FilesService } from 'src/files/files.service';
import { UserDto } from 'src/users/dto/user.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { MailService } from 'src/mail/mail.service';
import { UserPassDto } from 'src/users/dto/user-pass.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly filesService: FilesService,
        private readonly tokensService: TokensService,
        private readonly mailService: MailService
    ) {}

    async registration(createUserDto: CreateUserDto) {
        const candidate = await this.usersService.getByEmail(createUserDto.email)
        if(candidate) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(createUserDto.password, 7)
        const activationLink = v4()

        const user = await this.usersService.create({...createUserDto, password: hashPassword}) as User & {_id: string}

        this.filesService.makeUserDir(user._id.toString())

        await this.mailService.sendMail(createUserDto.email, `${(process.env.API_URL)}/api/activate/${activationLink}`, createUserDto.name)
            .catch(() => {
                throw new HttpException('This email does not exist', HttpStatus.BAD_REQUEST);
            })

        const userDto = new UserDto(user)
        const userPassDto = new UserPassDto({_id: user._id, email: user.email})
        const tokens = this.tokensService.generateTokens({...userPassDto})
        await this.tokensService.saveToken(userDto._id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async login(loginUserDto: LoginUserDto, response) {
        const user = await this.usersService.getByEmail(loginUserDto.email) as User & {_id: string}
        if(!user) {
            throw new HttpException('The user with such an email is not found', HttpStatus.BAD_REQUEST)
        }

        const isPassEquals = await bcrypt.compare(loginUserDto.password, user.password)
        if(!isPassEquals) {
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST)
        }

        const userDto = new UserDto(user)
        const userPassDto = new UserPassDto({_id: user._id, email: user.email})
        const tokens = this.tokensService.generateTokens({...userPassDto})
        await this.tokensService.saveToken(userDto._id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken: string) {
        const token = await this.tokensService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) {
            throw new HttpException('You are not authorized', HttpStatus.BAD_REQUEST)
        }
        const userData = this.tokensService.validateRefreshToken(refreshToken)
        const tokenFromDb = await this.tokensService.findToken(refreshToken)
        
        if(!userData || !tokenFromDb) {
            throw new HttpException('You are not authorized', HttpStatus.BAD_REQUEST)
        }

        const user = await this.usersService.getOne(userData._id) as User & {_id: string}

        const userDto = new UserDto(user)
        const userPassDto = new UserPassDto({_id: user._id, email: user.email})

        const tokens = this.tokensService.generateTokens({...userPassDto})
        await this.tokensService.saveToken(userDto._id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
}