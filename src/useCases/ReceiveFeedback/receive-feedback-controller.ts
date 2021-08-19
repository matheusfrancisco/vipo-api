import { Request, Response } from "express";
import { ServiceError } from "@errors/service-error";
import { ReceiveFeedbackUseCase } from "@useCases/ReceiveFeedback/receive-feedback-use-case";
interface RequestExtended extends Request{
  user: {
    id: string;
    email: string;
  };
}
export class ReceiveFeedbackController {
  constructor(private receiveFeedbackUseCAse: ReceiveFeedbackUseCase) {}

  public async handle(request: RequestExtended, response: Response): Promise<Response> {
    const { rating, bestRatedItem, leastRatedItem, comments } = request.body;
    const { establishmentId } = request.params;
    const { email } = request.user;

    if (!rating || !bestRatedItem || !leastRatedItem || !establishmentId)
      throw new ServiceError("Parameters missing");

    const result = await this.receiveFeedbackUseCAse.execute({
      email,
      establishmentId: Number(establishmentId),
      rating,
      bestRatedItem,
      leastRatedItem,
      comments
    });

    return response.json(result);
  }
}
