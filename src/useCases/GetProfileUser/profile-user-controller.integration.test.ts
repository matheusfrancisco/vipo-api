import request from "supertest";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { routerFactory } from "@infrastructure/routes";
import MockUserData from "@domain/user/mocks/mock-user-data";
import { capitalize } from "lodash";
import  { Gender }  from "@domain/user/IUser";
import { server } from "../../index";

describe("profile user integration test", () => {
  let serverFactoryWithUserRoute: { app: Express.Application };

  beforeEach(async () => {
    const userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);

    jest.setTimeout(60000);
  });

  xtest("should register a user and get all profile informations", async () => {
    //#TODO this test is wrong because profiles are undefined
    //#We need investigate this
    const user = new MockUserData();
    user.gender = capitalize(user.gender) as Gender;

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
        name: user.name,
        lastName: user.lastName,
        birthDate: user.birthDate,
        gender: user.gender,
        email: user.email,
        profile: {
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
