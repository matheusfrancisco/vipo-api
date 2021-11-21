import { IRecommendationPayload } from "@domain/recommendation-request/recommendation-request";

export interface IRecommendationProvider {
  getRecommendations(payload: IRecommendationPayload): Promise<any>;
}
