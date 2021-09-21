import { Request, Response } from "express";
import { UpdateUserUseCase } from "@useCases/UpdateUser/update-user-use-case";
import { ServiceError } from "@errors/service-error";
interface RequestExtended extends Request {
  user: {
    id: string;
    email: string;
  };
}
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  public async handle(
    request: RequestExtended,
    response: Response
  ): Promise<Response> {
    const { id } = request.user;
    const { name, lastName } = request.body;
    // #TODO add field address

    if (!name || !lastName || !id) throw new ServiceError("Parameters missing");

    const user = await this.updateUserUseCase.execute({
      userId: Number(id),
      name,
      lastName
    });

    return response.status(201).json({ user });
  }
}
