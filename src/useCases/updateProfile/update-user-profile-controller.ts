import { Request, Response } from "express";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import { ServiceError } from "@errors/service-error";
import { UpdateUserProfileUseCase } from "./update-user-profile-use-case";
import { FindUserUseCase } from "../FindUser/find-user-use-case";

export class UpdateUserProfileController {
  constructor(
    private updateUserProfileUseCase: UpdateUserProfileUseCase,
    private findUserUseCase: FindUserUseCase
  ) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<UserEntity | undefined | Response<any>> {
    const { email } = request.user;
    const { profileInformations } = request.body;

    const user = await this.findUserUseCase.execute({
      email
    });

    if (!user) throw new ServiceError("User not found.", 404);

    const userProfile = await this.updateUserProfileUseCase.execute({
      userId: user.id,
      profileInformations
    });

    return response.status(200).json({
      profile: userProfile
    });
  }
}
