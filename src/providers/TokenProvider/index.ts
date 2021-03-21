import JwtTokenProvider from "@providers/TokenProvider/implementations/JwtTokenProvider";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";

export default function makeTokenProvider(): ITokenProvider {
  const provider = new JwtTokenProvider();

  return provider;
}
