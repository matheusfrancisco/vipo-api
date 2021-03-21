import { v4 as uuid, validate } from "uuid";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";

export default class MockTokenProvider implements ITokenProvider {
  public generateToken = jest.fn(async () => {
    const fakeToken = uuid();

    return fakeToken;
  });

  public decodeToken = jest.fn(async (token: string) => {
    const isValid = validate(token);

    if (!isValid) throw new Error("Token is invalid");

    return null as any;
  });
}
