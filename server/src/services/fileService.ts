import * as uuid from 'uuid'
import * as path from 'path'
import { unlink, mkdirSync } from 'fs'

class FileService{
    makeUserDir(userId: string) {
        try {
            mkdirSync(path.resolve('static', userId))

        } catch (error) {
            console.log(error)
        }
    }

    savePicture(file: any, userId: string) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve(`static\\${userId}`, fileName)

            file.mv(filePath)

            return fileName

        } catch (error) {
            console.log(error)
        }
    }

    deletePicture(fileName: string, userId: string) {
        try {
            const filePath = path.resolve(`static\\${userId}`, fileName)

            unlink(filePath, (error) => {
                if(error) console.log(error);
                console.log(`${filePath} was deleted`)
            })

            return fileName

        } catch (error) {
            console.log(error)
        }
    }
}

export default new FileService()