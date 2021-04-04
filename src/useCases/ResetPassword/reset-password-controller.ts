import { ResetPasswordUseCase } from "@useCases/ResetPassword/reset-password-use-case";
import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, redirectURL } = request.body;

    if (!email || !redirectURL) throw new ServiceError("Parameters missing");

    await this.resetPasswordUseCase.execute({ email, redirectURL });

    return response.status(204).send();
  }
}
