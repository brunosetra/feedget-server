export interface SendMailData {
  subject: string;
  body: string;
}

export interface MailService {
  send: (data: SendMailData) => Promise<void>;
}
