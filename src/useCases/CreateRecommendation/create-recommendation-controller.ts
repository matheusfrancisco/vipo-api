import { Request, Response } from "express";
import { CreateRecommendationUseCase } from "./create-recommendation-use-case";
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
      !request.body.numberOfPeople ||
      !request.body.howMuch ||
      !request.body.like
    ) {
      response.status(400).json(buildErrorMessage("Parameters missing"));
      return;
    }
    try {
      await this._createRecommendationUseCase.execute({
        userEmail: request.body.email,
        numberOfPeople: request.body.numberOfPeople,
        howMuch: request.body.howMuch,
        like: request.body.like,
      });

      let answerRecommendation = { recommendation: "Night Pub" };

      return response.status(201).send(answerRecommendation);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error.",
      });
    }
  }
}
