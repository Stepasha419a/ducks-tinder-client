import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../exceptions/api-error";
import TokenService from "../services/TokenService";

interface UserAuthRequest extends Request {
    user: string | JwtPayload
}

export default function(req: UserAuthRequest, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = TokenService.validateAccessToken(accessToken)
        if(!userData) {
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}