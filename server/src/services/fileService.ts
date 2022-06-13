import * as uuid from 'uuid'
import * as path from 'path'

class FileService{
    saveFile(file: any) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('static', fileName)

            file.mv(filePath)

            return fileName

        } catch (error) {
            console.log(error)
        }
    }
}

export default new FileService()