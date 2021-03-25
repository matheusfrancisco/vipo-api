import { LogUserUseCase } from "@useCases/LogUser/log-user-use-case";
import { Request, Response } from "express";

const buildErrorMessage = (message: string) => ({ error: message });

export class LogUserController {
  constructor(private logUserUseCase: LogUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email || !password)
      return response.status(400).json(buildErrorMessage("Parameters missing"));

    try {
      const result = await this.logUserUseCase.execute({ email, password });

      return response.json(result);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      });
    }
  }
}
