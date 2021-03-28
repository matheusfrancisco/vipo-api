import IMailProvider from "@providers/MailProvider/models/IMailProvider";

export default class MockMailProvider implements IMailProvider {
  public async sendMail(): Promise<void> {
    return Promise.resolve();
  }
}
