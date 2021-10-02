import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";
import { Gender } from "@domain/user/IUser";
import { CreateUserUseCase } from "./create-user-use-case";

const validGenders = ["Male", "Female", "Neuter"];

const isGenderValid = (gender: string): gender is Gender =>
  validGenders.includes(gender);

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

    if (Object.keys(request.body.password).length < 8)
      throw new ServiceError("Short password.");

    const birthDate = new Date(request.body.birthDate);
    const actualYear = new Date();

    if (actualYear.getFullYear() - birthDate.getFullYear() <= 18)
      throw new ServiceError("Under age.");

    if (actualYear.getFullYear() - birthDate.getFullYear() >= 100)
      throw new ServiceError("Over age.");

    if (!isGenderValid(request.body.gender))
      throw new ServiceError("Invalid gender.");

    const gender = request.body.gender as "Male" | "Female" | "Neuter";

    await this.createUserUseCase.execute({
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      lastName: request.body.lastName,
      gender: Gender[gender],
      birthDate
    });

    return response.status(201).send();
  }
}
