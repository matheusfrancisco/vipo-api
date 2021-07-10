import IRecommendationRequest from "@domain/recommendation-request/IRecommendationRequest";
import IRecommendationRequestsRepository from "@domain/recommendation-request/IRecommendationRequestsRepository";
import RecommendationRequest from "@domain/recommendation-request/recommendation-request";
import MockUserData from "@domain/user/mocks/mock-user-data";

export default class MockRecommendationRequestsRepository
  implements IRecommendationRequestsRepository {
  private recommendationRequests: IRecommendationRequest[] = [];

  public async save({
    howMuch,
    like,
    numberOfPeople,
    userId
  }: RecommendationRequest): Promise<IRecommendationRequest> {
    const user = new MockUserData();

    const newRequest: IRecommendationRequest = {
      howMuch,
      like,
      numberOfPeople,
      user: {
        ...user,
        id: userId
      }
    };

    this.recommendationRequests.push(newRequest);

    return newRequest;
  }
}
