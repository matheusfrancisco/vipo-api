import request from "supertest";
import { server } from "../../../index";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("update profile integration test", () => {
  let serverFactoryWithUserRoute: any;

  beforeEach(async () => {
    const userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);
    jest.setTimeout(60000);
  });

  test("should update user profile", async () => {
    const user = {
      name: "Matthew",
      email: "xicoooooodo@hotmail.com",
      password: "123123"
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

    const update = await request(serverFactoryWithUserRoute.app)
      .patch("/profile")
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
