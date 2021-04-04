import { LogUserUseCase } from "@useCases/LogUser/log-user-use-case";
import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";

export class LogUserController {
  constructor(private logUserUseCase: LogUserUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email || !password) throw new ServiceError("Parameters missing");

    const result = await this.logUserUseCase.execute({ email, password });

    return response.json(result);
  }
}
