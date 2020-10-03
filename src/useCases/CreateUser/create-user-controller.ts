import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-use-case";
const buildErrorMessage = (message: string) => ({ error: message });

export class CreateUserController {
  private _createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this._createUserUseCase = createUserUseCase;
  }

  async handle(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    if (
      !request.body ||
      !request.body.name ||
      !request.body.email ||
      !request.body.password
    ) {
      response.status(400).json(buildErrorMessage("Parameters missing"));
      return;
    }
    try {
      await this._createUserUseCase.execute({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
      });

      return response.status(201).send();
    } catch (err) {
      // const status = error.constructor.name === "ServiceError" ? 400 : 500;
      // res.status(status).json(buildErrorMessage(error.message));
      return response.status(400).json({
        message: err.message || "Unexpected error."
      });
    }
  }
}
