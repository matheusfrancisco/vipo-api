import { CreateNewPasswordUseCase } from "@useCases/CreateNewPassword/create-new-password-use-case";
import { Request, Response } from "express";

const buildErrorMessage = (message: string) => ({ error: message });

export class CreateNewPasswordController {
  constructor(private createNewPasswordUseCase: CreateNewPasswordUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    if (!token || !password)
      return response.status(400).json(buildErrorMessage("Parameters missing"));

    try {
      await this.createNewPasswordUseCase.execute({ token, password });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      });
    }
  }
}
