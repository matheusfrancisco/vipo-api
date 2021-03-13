import request from "supertest";
import { server } from "../../../index";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("integration test", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;

  beforeEach(async () => {
    userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);

    jest.setTimeout(60000);
  });

  test("should register a user and get all profile informations", async () => {
    const user = {
      name: "mt",
      email: "xicoooooodo1@hotmail.com",
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
      .get("/profile")
      .set({ authorization: `Bearer ${login.body.token}` });

    expect(profileUserInfo.body).toEqual({
      name: "mt",
      lastName: "Xico",
      birthDate: "09/09/1994",
      gender: "Male",
      profileInformations: {
        // musicals: ["rock", "ki"],
        // foods: ["pasta"],
        // drinks: ["coffe", "wine", "juice"]
      }
    });
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
