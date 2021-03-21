import { SignWithGoogleUseCase } from "@useCases/SignWithGoogleUseCase/sign-with-google-use-case";
import { Request, Response } from "express";

const buildErrorMessage = (message: string) => ({ error: message });

export class SignWithGoogleController {
  constructor(private signWithGoogleUseCase: SignWithGoogleUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    if (!token)
      return response.status(400).json(buildErrorMessage("Parameters missing"));

    try {
      const result = await this.signWithGoogleUseCase.execute(token);

      return response.json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      });
    }
  }
}
