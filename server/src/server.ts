require('dotenv').config()
import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import router from './router/router'
import fileUpload from 'express-fileupload'
import { ConnectionOptions } from 'tls'
import cors from 'cors'
import errorMiddleware from './middlewares/error-middleware'
import wss from './services/WebsocketService'

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorMiddleware)

wss // starting websocket server

async function startApp() {
    try {
        await mongoose.connect(process.env.DB_URL as string, {useUnifiedTopology: true, useNewUrlParser: true} as ConnectionOptions)

        app.listen(PORT, () => console.log(`Server is working on port ${PORT}`))

    } catch (error) {
        console.log(error)
    }
}

startApp()