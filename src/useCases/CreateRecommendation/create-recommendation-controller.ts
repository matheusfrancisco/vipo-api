import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";
import { CreateRecommendationUseCase } from "./create-recommendation-use-case";

export class CreateRecommendationController {
  constructor(
    private createRecommendationUseCase: CreateRecommendationUseCase
  ) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response | undefined> {
    const { email } = request.user;
    const { numberOfPeople, howMuch, like } = request.body;

    if (!email || !numberOfPeople || !howMuch || !like)
      throw new ServiceError("Parameters missing");

    const recommendations = await this.createRecommendationUseCase.execute({
      email,
      numberOfPeople,
      howMuch,
      like
    });

    return response.status(200).json({ recommendations });
  }
}
