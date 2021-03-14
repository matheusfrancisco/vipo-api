import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-use-case";
import { Gender } from "../../infrastructure/entity/user-entity";

const buildErrorMessage = (message: string) => ({ error: message });

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    if (
      !request.body ||
      !request.body.name ||
      !request.body.lastName ||
      !request.body.birthDate ||
      !request.body.gender ||
      !request.body.email ||
      !request.body.password
    ) {
      return response.status(400).json(buildErrorMessage("Parameters missing"));
    }
    const gender = request.body.gender as "Male" | "Female" | "Neuter";
    try {
      await this.createUserUseCase.execute({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        lastName: request.body.lastName,
        gender: Gender[gender],
        birthDate: new Date(request.body.birthDate)
      });

      return response.status(201).send();
    } catch (err) {
      // const status = error.constructor.name === "ServiceError" ? 400 : 500;
      // res.status(status).json(buildErrorMessage(error.message));
      return response.status(400).json({
        message: err.message || "Unexpected error."
      });
    }
  }
}
