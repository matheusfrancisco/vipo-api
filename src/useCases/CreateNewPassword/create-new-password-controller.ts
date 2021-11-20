import { CreateNewPasswordUseCase } from "@useCases/CreateNewPassword/create-new-password-use-case";
import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";

export class CreateNewPasswordController {
  constructor(private createNewPasswordUseCase: CreateNewPasswordUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    if (!token || !password) throw new ServiceError("parameters_missing");

    await this.createNewPasswordUseCase.execute({ token, password });

    return response.status(201).send();
  }
}
