import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import {google} from 'googleapis'

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

@Injectable()
export class MailService {
    async activate(link: string) {

    }

    public async sendMail(to: string, link: string, name: string) {
        try {
            const accessToken = await oAuth2Client.getAccessToken()
    
            const transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: 'OAuth2',
                    user: process.env.CLIENT_USER,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken,
                }
            })
    
            const mailOptions = {
                from: `Ducks Tinder <${process.env.CLIENT_USER}>`,
                to,
                subject: `Активация аккаунта на Ducks Tinder`,
                text: `Добрый день ${name}!`,
                html: `<div>
                    <h1>для активации перейдите по ссылке</h1>
                    <a href=${link}>${link}</a>
                </div>`
            }
            
            const result = await transport.sendMail(mailOptions)
    
            return result
        } catch (error) {
            return error
        }
    }
}
