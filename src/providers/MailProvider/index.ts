import MockMailProvider from "@providers/MailProvider/mocks/MockMailProvider";
import IMailProvider from "@providers/MailProvider/models/IMailProvider";

export default function makeMailProvider(): IMailProvider {
  return new MockMailProvider();
}
