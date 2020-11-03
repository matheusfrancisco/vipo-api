import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ServiceError } from "../service-error";
import { Request, Response, NextFunction } from "express";

export class Auth {
  constructor(private userRepository: any) {
    this.userRepository = userRepository;
    this.singIn = this.singIn.bind(this);
    this.verify = this.verify.bind(this);
  }

  async singIn(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = await this.userRepository.findByEmail(request.body.email);
      if (
        user &&
        (await bcrypt.compare(request.body.password, user.password))
      ) {
        const token = this.createToken(user.id, user.email);
        // return token;
        request.body.token = token;
        request.body.user = user;
        next();
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public createToken(id: number, email: string) {
    const token = jwt.sign(
      {
        id,
        email,
      },
      "SECRET",
      {
        expiresIn: "2h",
      }
    );

    return token;
  }

  public getToken(authorization: any): string {
    const authParameters = authorization.split(" ");
    if (authParameters[0] == "Bearer" && authParameters[1]) {
      return authParameters[1];
    }
    throw new ServiceError("BadRequest");
  }

  public async verify(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Record<string, string> | null | ServiceError> {
    try {
      const userToken = await this.getToken(request.headers.authorization);
      const userPayload = jwt.verify(userToken, "SECRET") as any;
      const user = await this.userRepository.findByEmail(userPayload.email);
      if (user) {
        request.body.userId = userPayload.id
        request.body.email = userPayload.email
        next();
        return null;
      }
      throw new ServiceError("Unauthorazing");
    } catch (error) {
      throw new ServiceError("Unauthorazing");
    }
  }
}
