import IGoogleProvider, {
  IGoogleUserPayload
} from "@providers/GoogleProvider/models/IGoogleProvider";
import { OAuth2Client } from "google-auth-library";
import env from "@config/environment";
import { ServiceError } from "@errors/service-error";

const authClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export default class GoogleAuthProvider implements IGoogleProvider {
  public async getUserLoginData(token: string): Promise<IGoogleUserPayload> {
    const ticket = await await authClient.verifyIdToken({
      idToken: token,
      audience: env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email)
      throw new ServiceError("google_autentication_error");

    return {
      email: payload.email,
      name: payload.given_name || "",
      lastName: payload.family_name || "",
      id: payload.sub
    };
  }
}
