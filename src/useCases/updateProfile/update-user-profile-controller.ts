import { Request, Response } from "express";
import { UserEntity } from "src/infrastructure/entity/user-entity";
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

    try {
      const user = await this.findUserUseCase.execute({
        email
      });

      if (!user) {
        return response.status(404).json({
          message: "User not found."
        });
      }

      const userProfile = await this.updateUserProfileUseCase.execute({
        userId: user.id,
        profileInformations
      });

      return response.status(200).json({
        profile: userProfile
      });
    } catch (err) {
      // const status = error.constructor.name === "ServiceError" ? 400 : 500;
      // res.status(status).json(buildErrorMessage(error.message));
      return response.status(400).json({
        message: err.message || "Unexpected error."
      });
    }
  }
}
