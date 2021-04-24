import request from "supertest";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { routerFactory } from "@infrastructure/routes";
import { server } from "../../../index";

describe("profile user integration test", () => {
  let serverFactoryWithUserRoute: { app: Express.Application };

  beforeEach(async () => {
    const userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);

    jest.setTimeout(60000);
  });

  test("should register a user and get all profile informations", async () => {
    const user = {
      name: "mt",
      email: "xicoooooodo11@hotmail.com",
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

    const profileUserInfo = await request(serverFactoryWithUserRoute.app)
      .get("/profiles")
      .set({ authorization: `Bearer ${login.body.token}` });

    expect(profileUserInfo.body).toEqual({
      user: {
        name: "mt",
        lastName: "Xico",
        birthDate: "1994-09-09T00:00:00.000Z",
        gender: "male",
        email: "xicoooooodo11@hotmail.com",
        profileInformations: {
          musicals: [],
          foods: [],
          drinks: []
        }
      }
    });
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    await CreateDatabaseConnection.endConnection();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
