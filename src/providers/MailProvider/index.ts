import ConsoleMailProvider from "@providers/MailProvider/implementations/ConsoleMailProvider";
import IMailProvider from "@providers/MailProvider/models/IMailProvider";

export default function makeMailProvider(): IMailProvider {
  return new ConsoleMailProvider();
}
