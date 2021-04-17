import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";
import { Gender } from "@domain/user/user";
import { CreateUserUseCase } from "./create-use-case";

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
    )
      throw new ServiceError("Parameters missing.");

    const gender = request.body.gender as "Male" | "Female" | "Neuter";

    await this.createUserUseCase.execute({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      lastName: request.body.lastName,
      gender: Gender[gender],
      birthDate: new Date(request.body.birthDate)
    });

    return response.status(201).send();
  }
}
