import { SignWithGoogleUseCase } from "@useCases/SignWithGoogleUseCase/sign-with-google-use-case";
import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";

export class SignWithGoogleController {
  constructor(private signWithGoogleUseCase: SignWithGoogleUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    if (!token) throw new ServiceError("Parameters missing");

    const result = await this.signWithGoogleUseCase.execute(token);

    return response.json(result);
  }
}
