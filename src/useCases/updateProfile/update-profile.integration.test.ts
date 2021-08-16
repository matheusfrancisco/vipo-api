import request from "supertest";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { routerFactory } from "@infrastructure/routes";
import { server } from "../../index";

describe("update profile integration test", () => {
  let serverFactoryWithUserRoute: { app: Express.Application };

  beforeEach(async () => {
    const userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);
    jest.setTimeout(60000);
  });

  test("should update user profile", async () => {
    const user = {
      name: "Matthew",
      email: "xico1ooooodo1@hotmail.com",
      password: "123123",
      lastName: "Xico",
      birthDate: "09/09/1994",
      gender: "Male"
    };

    const register = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send(user);

    expect(register.status).toBe(201);

    const login = await request(serverFactoryWithUserRoute.app)
      .post("/signin")
      .send({
        email: user.email,
        password: user.password
      });

    expect(login.status).toBe(200);

    const update = await request(serverFactoryWithUserRoute.app)
      .patch("/profiles")
      .set({ authorization: `Bearer ${login.body.token}` })
      .send({
        profileInformations: {
          musicals: ["rock", "ki"],
          foods: ["pasta"],
          drinks: ["coffe", "wine", "juice"]
        }
      });
    expect(update.body.profile.drinks).toEqual(["coffe", "wine", "juice"]);
    expect(update.body.profile.foods).toEqual(["pasta"]);
    expect(update.body.profile.musicals).toEqual(["rock", "ki"]);
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    await CreateDatabaseConnection.endConnection();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
