import EstablishmentFeedback from "@domain/establishment-feedback/establishment-feedback";
import MockEstablishmentFeedback from "@domain/establishment-feedback/mocks/mock-establishment-feedback";

describe("Establishment Feedback", () => {
  it("should instantiate the object correctly", () => {
    const request = new EstablishmentFeedback(new MockEstablishmentFeedback());

    expect(request).toHaveProperty("userId");
    expect(request).toHaveProperty("establishmentId");
    expect(request).toHaveProperty("rating");
    expect(request).toHaveProperty("bestRatedItem");
    expect(request).toHaveProperty("leastRatedItem");
    expect(request).toHaveProperty("comments");
  });
});
