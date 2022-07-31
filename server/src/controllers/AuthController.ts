import { NextFunction } from "express"
import { validationResult } from "express-validator"
import ApiError from "../exceptions/api-error"
import authService from "../services/AuthService"

class AuthController {

    async registration(req: any, res: any, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации'))
            }

            const {email, name, password, age, sex, partnerSettings} = req.body
            const userData = await authService.registration(email, name, password, age, sex, partnerSettings)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)

        } catch (error: any) {
            next(error)
        }
    }

    async login(req: any, res: any, next: NextFunction) {
        try {
            const {email, password} = req.body
            const userData = await authService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)

        } catch (error: any) {
            console.log('error ' + error)
            next(error)
        }
    }

    async logout(req: any, res: any, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const token = await authService.logout(refreshToken)
            res.clearCookie('refreshToken')

            return res.json(token)
        } catch (error: any) {
            next(error)
        }
    }

    async activate(req: any, res: any, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (error: any) {
            next(error)
        }
    }

    async refresh(req: any, res: any, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies

            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)

        } catch (error: any) {
            next(error)
        }
    }
}

export default new AuthController()