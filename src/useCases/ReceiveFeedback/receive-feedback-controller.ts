import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";
import { ReceiveFeedbackUseCase } from "@useCases/ReceiveFeedback/receive-feedback-use-case";

export class ReceiveFeedbackController {
  constructor(private receiveFeedbackUseCAse: ReceiveFeedbackUseCase) {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { rating, bestRatedItem, leastRatedItem, comments } = request.body;
    const { venueId } = request.params;
    const { id } = request.user;

    if (!rating || !bestRatedItem || !leastRatedItem || !venueId)
      throw new ServiceError("Parameters missing");

    const result = await this.receiveFeedbackUseCAse.execute({
      userId: Number(id),
      venueId: Number(venueId),
      rating,
      bestRatedItem,
      leastRatedItem,
      comments
    });

    return response.json(result);
  }
}
