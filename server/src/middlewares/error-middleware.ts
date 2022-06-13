import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error";

export default function(error: Error | string, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    if(error instanceof ApiError) {
        return res.status(error.status).json({message: error.message, error: error.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}