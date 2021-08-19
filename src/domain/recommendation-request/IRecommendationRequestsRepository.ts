import IRecommendationRequest from "@domain/recommendation-request/IRecommendationRequest";
import RecommendationRequest from "@domain/recommendation-request/recommendation-request";

export default interface IRecommendationRequestsRepository {
  save(request: RecommendationRequest): Promise<IRecommendationRequest>;
}
