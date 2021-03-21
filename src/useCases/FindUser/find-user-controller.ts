import { Request, Response } from "express";
import { UserEntity } from "src/infrastructure/entity/user-entity";
import { FindUserUseCase } from "./find-user-use-case";

const buildErrorMessage = (message: string) => ({ error: message });

export class FindUserController {
  private _findUserUseCase: FindUserUseCase;

  constructor(findUserUseCase: FindUserUseCase) {
    this._findUserUseCase = findUserUseCase;
  }

  async handle(
    request: Request,
    response: Response
  ): Promise<UserEntity | undefined | Response> {
    if (!request.body || !request.body.name || !request.body.email) {
      response.status(400).json(buildErrorMessage("Parameters missing"));
      return;
    }
    try {
      const user = await this._findUserUseCase.execute({
        name: request.body.name,
        email: request.body.email
      });

      return user;
    } catch (err) {
      // const status = error.constructor.name === "ServiceError" ? 400 : 500;
      // res.status(status).json(buildErrorMessage(error.message));
      return response.status(400).json({
        message: err.message || "Unexpected error."
      });
    }
  }
}
