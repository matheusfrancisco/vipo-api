import request from "supertest";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { routerFactory } from "@infrastructure/routes";
import { server } from "../../../index";

describe("Integration test: Recommendation profile", () => {
  it("should create an recommendation user profile", async () => {
    const userRoutes = await routerFactory();
    const serverFactoryWithUserRoute = await server(userRoutes);

    const user = {
      name: "mt",
      email: "xicoooooo1@hotmail.com",
      password: "123123",
      lastName: "Fran",
      birthDate: "09/09/1994",
      gender: "Male"
    };

    await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send(user);

    const loginResponse = await request(serverFactoryWithUserRoute.app)
      .post("/signin")
      .send({
        email: user.email,
        password: user.password
      });

    const recommendationResponse = await request(serverFactoryWithUserRoute.app)
      .post("/users/recommendation")
      .set({ authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        howMuch: "R$10 - R$100",
        numberOfPeople: 4,
        like: ["party", "food", "rock"]
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
