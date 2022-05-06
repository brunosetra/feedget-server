import express from "express";
import { FeedbackRepositoryPrisma } from "./repositories/prisma/FeedbackRepositoryPrisma";
import { MailServiceNodeMailer } from "./services/nodemailer/MailServiceNodemailer";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedbackRepoPrisma = new FeedbackRepositoryPrisma();

  const mailService = new MailServiceNodeMailer();

  await feedbackRepoPrisma.create({ type, comment, screenshot });

  await mailService.send({
    subject: "Novo feedback no Feedget",
    body: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do comentário: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `<p>Screenshot</p>`,
      screenshot
        ? `<img src="${screenshot}" alt="Screenshot" style="max-width:500px;"/>`
        : ``,
      `</div>`,
    ].join("\n"),
  });

  return res.status(201).send();
});
