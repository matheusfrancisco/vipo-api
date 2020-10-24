import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ServiceError } from "../service-error";
import { Request, Response, NextFunction } from "express";

export class Auth {
  constructor(private userRepository: any) {
    this.userRepository = userRepository;
    this.singIn = this.singIn.bind(this);
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
        email
      },
      "SECRET",
      {
        expiresIn: "2h"
      }
    );

    return token;
  }

  public async verify(
    token: string,
    url: string
  ): Promise<Record<string, string> | null | ServiceError> {
    try {
      const userPayload = (await jwt.verify(token, "SECRET")) as any;
      const user = await this.userRepository.findByEmail(userPayload.email);
      if (user) {
        return {
          id: userPayload.id,
          email: userPayload.email
        };
      }
      return null;
    } catch (error) {
      throw new ServiceError("Unauthorazing");
    }
  }
}
