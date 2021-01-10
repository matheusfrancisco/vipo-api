import { Request, Response } from "express";
import { CreateRecommendationUseCase, ICreateRec } from "./create-recommendation-use-case";
const buildErrorMessage = (message: string) => ({ error: message });

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
    ) {
      response.status(400).json(buildErrorMessage("Parameters missing"));
      return;
    }
    const {email, numberOfPeople, howMuch, like } = request.body
    try {
      const recommendations = await this._createRecommendationUseCase.execute(
        {userEmail: email, numberOfPeople, howMuch, like } as ICreateRec
      );

      return response.status(200).json({recommendations});
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
