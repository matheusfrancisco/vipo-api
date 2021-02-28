import IHashProvider from "@providers/HashProvider/models/IHashProvider";
import BCryptHashProvider from "@providers/HashProvider/implementations/BCryptHashProvider";

export default function makeHashProvider(): IHashProvider {
  const provider = new BCryptHashProvider();

  return provider;
}
