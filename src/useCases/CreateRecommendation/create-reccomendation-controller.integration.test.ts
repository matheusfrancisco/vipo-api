import request from "supertest";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { routerFactory } from "@infrastructure/routes";
import MockUserData from "@domain/user/mocks/mock-user-data";
import MockRecommendationRequest from "@domain/recommendation-request/mock/mock-recommendation-request";
import { server } from "../../../index";

describe("Integration test: Recommendation profile", () => {
  it("should create an recommendation user profile", async () => {
    const userRoutes = await routerFactory();
    const serverFactoryWithUserRoute = await server(userRoutes);

    const user = new MockUserData();

    await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: user.name,
        email: user.email,
        password: user.password,
        lastName: user.lastName,
        birthDate: user.birthDate,
        gender: user.gender
      });

    const loginResponse = await request(serverFactoryWithUserRoute.app)
      .post("/signin")
      .send({
        email: user.email,
        password: user.password
      });

    const recommendationRequest = new MockRecommendationRequest();

    const recommendationResponse = await request(serverFactoryWithUserRoute.app)
      .post("/users/recommendation")
      .set({ authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        howMuch: recommendationRequest.howMuch,
        numberOfPeople: recommendationRequest.numberOfPeople,
        like: recommendationRequest.like
      });

    const recommendations = [
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" }
    ];
    expect(recommendationResponse.body.recommendations).toEqual(
      recommendations
    );
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
