import { ServiceError } from "@errors/service-error";
import { Request, Response } from "express";

export class MockController {
  constructor(private mockUseCase: any) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    if (!id) throw new ServiceError("parameters_missing");

    const result = await this.mockUseCase.execute(id);

    return response.json(result);
  }
}
