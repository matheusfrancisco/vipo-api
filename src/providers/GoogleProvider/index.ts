import GoogleAuthProvider from "@providers/GoogleProvider/implementations/GoogleAuthProvider";
import IGoogleProvider from "@providers/GoogleProvider/models/IGoogleProvider";

export default function makeGoogleProvider(): IGoogleProvider {
  const provider = new GoogleAuthProvider();

  return provider;
}
