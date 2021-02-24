import { Request, Response } from "express";
import { UpdateUserProfileUseCase } from "./update-user-profile-use-case";
import { FindUserUseCase } from '../FindUser/find-user-use-case';
import { UserEntity } from "src/infrastructure/entity/user-entity";
const buildErrorMessage = (message: string) => ({ error: message });

export class UpdateUserProfileController {
  private _updateUserProfileUseCase: UpdateUserProfileUseCase;
  private _findUserUseCase: FindUserUseCase;

  constructor(
    updateUserProfileUseCase: UpdateUserProfileUseCase,
    findUserUseCase: FindUserUseCase,
  ) {
    this._updateUserProfileUseCase = updateUserProfileUseCase;
    this._findUserUseCase = findUserUseCase
  }

  async handle(
    request: Request,
    response: Response
  ): Promise<UserEntity | undefined | Response<any>> {

    if (!request.body || !request.body.email) {
      response.status(400).json(buildErrorMessage("Parameters missing"));
      return;
    }

    try {

      const user = await this._findUserUseCase.execute({
        email: request.body.email,
      })

      if (!user) {
        return response.status(404).json({
          message: "User not found."
        });
      }

      const userProfile = await this._updateUserProfileUseCase.execute({
        userId: user.id,
        profileInformations: request.body.profileInformations,
      });

      return response.status(200).json({
        profile: userProfile,
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
