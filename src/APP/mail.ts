import { MailerModule } from "@nestjs-modules/mailer";

export default MailerModule.forRoot({
  transport: {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  defaults: {
    from: process.env.MAIL_DEFAULT_FROM,
  },
})