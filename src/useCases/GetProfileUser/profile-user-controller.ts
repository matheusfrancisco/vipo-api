import { Request, Response } from "express";
import { FindUserUseCase } from "@useCases/FindUser/find-user-use-case";
import { ProfileUserUseCase } from "@useCases/GetProfileUser/profile-user-use-case";
import { ServiceError } from "@errors/service-error";

export class ProfileUserController {
  constructor(
    private profileUserUseCase: ProfileUserUseCase,
    private findUseCase: FindUserUseCase
  ) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.user;

    if (!email) throw new ServiceError("Parameters missing");

    const existingUser = await this.findUseCase.execute({ email });

    if (!existingUser) throw new Error("User does not exist");

    const user = await this.profileUserUseCase.execute({
      email
    });

    return response.status(201).json({ user });
  }
}
