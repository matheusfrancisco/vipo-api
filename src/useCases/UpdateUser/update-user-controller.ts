import { RequestHandler } from "express";
import { UpdateUserUseCase } from "./update-user-use-case";

const buildErrorMessage = (message: string) => ({ error: message });

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  public handle: RequestHandler = async (request, response) => {
    const { name, lastName, userId } = request.body;

    if (!name || !lastName || !userId)
      return response.status(400).json(buildErrorMessage("Parameters missing"));

    try {
      const user = await this.updateUserUseCase.execute({
        userId,
        name,
        lastName
      });

      return response.status(201).json({ user });
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      });
    }
  };
}
