import MockRecommendationRequest from "@domain/recommendation-request/mock/mock-recommendation-request";
import RecommendationRequest from "@domain/recommendation-request/recommendation-request";

describe("Recommendation request", () => {
  it("should instantiate the object correctly", () => {
    const request = new RecommendationRequest(new MockRecommendationRequest());

    expect(request).toHaveProperty("userId");
    expect(request).toHaveProperty("numberOfPeople");
    expect(request).toHaveProperty("howMuch");
    expect(request).toHaveProperty("like");
  });
});
