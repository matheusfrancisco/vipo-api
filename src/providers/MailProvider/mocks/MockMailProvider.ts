import IMailProvider from "@providers/MailProvider/models/IMailProvider";

export default class MockMailProvider implements IMailProvider {
  public sendMail = jest.fn(() => Promise.resolve());
}
