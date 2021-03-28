import { ResetPasswordUseCase } from "@useCases/ResetPassword/reset-password-use-case";
import { Request, Response } from "express";

const buildErrorMessage = (message: string) => ({ error: message });

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, redirectURL } = request.body;

    if (!email || !redirectURL)
      return response.status(400).json(buildErrorMessage("Parameters missing"));

    try {
      await this.resetPasswordUseCase.execute({ email, redirectURL });

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      });
    }
  }
}
