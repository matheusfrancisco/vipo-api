import request from "supertest";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { server } from "../../../index";
import { routerFactory } from "../../../routes";

describe("Integration test: Recommendation profile", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;

  beforeEach(async () => {
    userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);
    jest.setTimeout(60000);
  });

  it("should create an recommendation user profile", async () => {
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
      .post("/user/recommendation")
      .set({ authorization: `Bearer ${loginResponse.body.token}` })
      .send({
        email: user.email,
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
