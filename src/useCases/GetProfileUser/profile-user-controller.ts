import { Request, Response } from "express";
import { FindUserUseCase } from "@useCases/FindUser/find-user-use-case";
import { ProfileUserUseCase } from "@useCases/GetProfileUser/profile-user-use-case";

const buildErrorMessage = (message: string) => ({ error: message });

export class ProfileUserController {
  constructor(
    private profileUserUseCase: ProfileUserUseCase,
    private findUseCase: FindUserUseCase
  ) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    if (!email)
      return response.status(400).json(buildErrorMessage("Parameters missing"));

    try {
      const existingUser = await this.findUseCase.execute({ email });

      if (!existingUser) throw new Error("User does not exist");

      const user = await this.profileUserUseCase.execute({
        email
      });

      return response.status(201).json({ user });
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      });
    }
  }
}
