import IMailProvider, {
  ISendMailOptions
} from "@providers/MailProvider/models/IMailProvider";

export default class ConsoleMailProvider implements IMailProvider {
  public async sendMail({
    resetPasswordLink,
    template,
    to
  }: ISendMailOptions): Promise<void> {
    console.log(`Sending a new e-mail.

      E-mail to: ${to}.
      URL to reset password: ${resetPasswordLink}.
      Used template: ${template}.
    `);
  }
}
