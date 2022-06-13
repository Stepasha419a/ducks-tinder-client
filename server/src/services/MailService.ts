import nodemailer from 'nodemailer'

class MailService {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || 'testauth419a@gmail.com',
                pass: process.env.SMTP_PASSWORD || 'testAuth419atestAuth419a'
            }
        })
    }

    async sendActivationMail(to: string, link: string, name: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER || 'testauth419a@gmail.com',
            to,
            subject: 'Здравствуйте ' + name + ', Активация Аккаунта на ' + (process.env.API_URL || 'http://localhost:5000'),
            text: '',
            html:
                `
                <div>
                    <h1>${name}, для активации перейдите по ссылке</h1>
                    <a href=${link}>${link}</a>
                </div>
                `
        })
    }
}

export default new MailService()