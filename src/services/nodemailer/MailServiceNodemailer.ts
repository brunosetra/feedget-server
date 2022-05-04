import nodemailer from "nodemailer";

import { MailService, SendMailData } from "../MailService";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c57334a6e146ad",
    pass: "e7da301779ae2d",
  },
});

export class MailServiceNodeMailer implements MailService {
  async send({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <no-reply@feedget.com>",
      to: "Bruno Setra <bruno.setra@gmail.com>",
      subject,
      html: body,
    });
  }
}
