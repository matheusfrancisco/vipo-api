import { Request, Response } from "express";
import { UserEntity } from "@infrastructure/database/entity/user-entity";
import { ServiceError } from "@errors/service-error";
import { UpdateUserProfileUseCase } from "./update-user-profile-use-case";
import { FindUserUseCase } from "../FindUser/find-user-use-case";

interface RequestExtended extends Request {
  user: {
    id: string;
    email: string;
  };
}
export class UpdateUserProfileController {
  constructor(
    private updateUserProfileUseCase: UpdateUserProfileUseCase,
    private findUserUseCase: FindUserUseCase
  ) {}

  async handle(
    request: RequestExtended,
    response: Response
  ): Promise<UserEntity | undefined | Response<any>> {
    const { email } = request.user;
    const { profileInformations } = request.body;

    if (!profileInformations) throw new ServiceError("Parameters missing!");

    if (
      !profileInformations.musicals ||
      !profileInformations.drinks ||
      !profileInformations.foods
    )
      throw new ServiceError("Profile informations missing!");

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
