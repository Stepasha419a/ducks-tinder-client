import * as uuid from 'uuid'
import * as path from 'path'
import { unlink } from 'fs'

class FileService{
    savePicture(file: any, userId: string) {
        try {
            const fileName = `${userId}user` + uuid.v4() + '.jpg'
            const filePath = path.resolve('static', fileName)

            file.mv(filePath)

            return fileName

        } catch (error) {
            console.log(error)
        }
    }

    deletePicture(fileName: string) {
        try {
            const filePath = path.resolve('static', fileName)

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