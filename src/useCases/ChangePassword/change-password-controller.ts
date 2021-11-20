import { Request, Response } from "express";
import { ChangePasswordUseCase } from "@useCases/ChangePassword/change-password-use-case";
import { FindUserUseCase } from "@useCases/FindUser/find-user-use-case";
import { ServiceError } from "@errors/service-error";

const buildErrorMessage = (message: string) => ({ error: message });

export class ChangePasswordController {
  constructor(
    private changePasswordUseCase: ChangePasswordUseCase,
    private findUseCase: FindUserUseCase
  ) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { password, newPassword, email } = request.body;

    if (!password || !newPassword || !email)
      return response.status(400).json(buildErrorMessage("parameters_missing"));

    const existingUser = await this.findUseCase.execute({ email });

    if (!existingUser) throw new ServiceError("user_not_exist");

    const user = await this.changePasswordUseCase.execute({
      userId: existingUser.id,
      dbPasswordHash: existingUser.password,
      password,
      newPassword
    });

    return response.status(201).json({ user });
  }
}
