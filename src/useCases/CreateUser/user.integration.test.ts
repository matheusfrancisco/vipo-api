import request from "supertest";
import { server } from "../../../index";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("user integration test", () => {
  let serverFactoryWithUserRoute: { app: Express.Application };

  beforeEach(async () => {
    const userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);

    jest.setTimeout(60000);
  });

  test("should register a user", async () => {
    const res = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo1@hotmail.com",
        password: "123123",
        lastName: "Xico",
        birthDate: "09/09/1994",
        gender: "Male"
      });

    console.log(res.body, res.status);

    expect(res.status).toEqual(201);
  });

  test("should throw user already exist", async () => {
    const user = {
      name: "mt",
      email: "xicoooooodo2@hotmail.com",
      password: "123123",
      lastName: "Xico",
      birthDate: "09/09/1994",
      gender: "Male"
    };

    await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send(user);

    const alreadyCreatedResponse = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send(user);

    expect(alreadyCreatedResponse.body.message).toEqual("User already exists.");
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    await CreateDatabaseConnection.endConnection();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
