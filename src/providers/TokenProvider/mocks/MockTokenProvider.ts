import { v4 as uuid, validate } from "uuid";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";

export default class MockTokenProvider implements ITokenProvider {
  public async generateToken(): Promise<string> {
    const fakeToken = uuid();

    return fakeToken;
  }

  public async decodeToken<T = unknown>(token: string): Promise<T> {
    const isValid = validate(token);

    if (!isValid) throw new Error("Token is invalid");

    return null as any;
  }
}
