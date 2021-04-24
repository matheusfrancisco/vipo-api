import jwt from "jsonwebtoken";
import ITokenProvider, {
  IGenerateTokenOptions
} from "@providers/TokenProvider/models/ITokenProvider";
import { ServiceError } from "@errors/service-error";

const SECRET = "SECRET";
const DEFAULT_EXPIRES_IN = "2h";

export default class JwtTokenProvider implements ITokenProvider {
  public async generateToken(
    payload: Record<string, unknown>,
    options?: IGenerateTokenOptions
  ): Promise<string> {
    const expiresIn = options?.expiresIn || DEFAULT_EXPIRES_IN;

    const token = jwt.sign(payload, SECRET, {
      expiresIn
    });

    return token;
  }

  public async decodeToken<T = unknown>(token: string): Promise<T> {
    try {
      const payload = jwt.verify(token, SECRET);

      return payload as any;
    } catch (error) {
      throw new ServiceError(error.message, 403);
    }
  }
}
