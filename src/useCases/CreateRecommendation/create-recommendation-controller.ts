import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";
import {
  CreateRecommendationUseCase,
  ICreateRec
} from "./create-recommendation-use-case";

export class CreateRecommendationController {
  private _createRecommendationUseCase: CreateRecommendationUseCase;

  constructor(createRecommendationUseCase: CreateRecommendationUseCase) {
    this._createRecommendationUseCase = createRecommendationUseCase;
  }

  async handle(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    if (
      !request.body.email ||
      !request.body.numberOfPeople ||
      !request.body.howMuch ||
      !request.body.like
    )
      throw new ServiceError("Parameters missing");

    const { email, numberOfPeople, howMuch, like } = request.body;

    const recommendations = await this._createRecommendationUseCase.execute({
      userEmail: email,
      numberOfPeople,
      howMuch,
      like
    } as ICreateRec);

    return response.status(200).json({ recommendations });
  }
}
