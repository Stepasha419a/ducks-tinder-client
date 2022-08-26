import * as uuid from 'uuid'
import * as path from 'path'
import { unlink, mkdirSync, rmSync } from 'fs'

class FileService{
    makeUserDir(userId: string) {
        try {
            mkdirSync(path.resolve('static', userId))
            mkdirSync(path.resolve('static', userId, 'avatar'))
            mkdirSync(path.resolve('static', userId, 'gallery'))

        } catch (error) {
            console.log(error)
        }
    }

    deleteUserDir(userId: string) {
        try {
            rmSync(path.resolve('static', userId), { recursive: true, force: true })

        } catch (error) {
            console.log(error)
        }
    }

    savePicture(file: any, userId: string, setting: 'avatar' | 'gallery') {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(`static\\${userId}\\${setting}`, fileName)

            file.mv(filePath)

            return fileName

        } catch (error) {
            console.log(error)
        }
    }

    deletePicture(fileName: string, userId: string, setting: 'avatar' | 'gallery') {
        try {
            const filePath = path.resolve(`static\\${userId}\\${setting}`, fileName)

            unlink(filePath, (error) => {
                if(error) console.log(error);
            })

            return fileName

        } catch (error) {
            console.log(error)
        }
    }
}

export default new FileService()