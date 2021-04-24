import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import { FindUserUseCase } from "./find-user-use-case";

export class FindUserController {
  constructor(private findUserUseCase: FindUserUseCase) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<UserEntity | undefined | Response> {
    const { email } = request.body;

    if (!email) throw new ServiceError("Parameters missing");

    const user = await this.findUserUseCase.execute({
      email
    });

    return response.json({ user });
  }
}
