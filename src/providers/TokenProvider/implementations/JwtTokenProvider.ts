import jwt from "jsonwebtoken";
import ITokenProvider from "@providers/TokenProvider/models/ITokenProvider";

const SECRET = "SECRET";
const EXPIRES_IN = "2h";

export default class JwtTokenProvider implements ITokenProvider {
  public async generateToken(
    payload: Record<string, unknown>
  ): Promise<string> {
    const token = jwt.sign(payload, SECRET, {
      expiresIn: EXPIRES_IN
    });

    return token;
  }

  public async decodeToken<T = unknown>(token: string): Promise<T> {
    const payload = jwt.verify(token, SECRET);

    return payload as any;
  }
}
