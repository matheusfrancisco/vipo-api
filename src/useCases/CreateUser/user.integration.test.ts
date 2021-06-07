import request from "supertest";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { routerFactory } from "@infrastructure/routes";
import { server } from "../../index";

const getServer = async () => {
  const userRoutes = await routerFactory();
  const serverFactoryWithUserRoute = await server(userRoutes);

  return serverFactoryWithUserRoute.app;
};

describe("user integration test", () => {
  beforeAll(async () => {
    jest.setTimeout(60000);
  });

  test("should register a user", async () => {
    const app = await getServer();

    const response = await request(app)
      .post("/users")
      .send({
        name: "matheus",
        email: "xicooooo2odo1@hotmail.com",
        password: "1231233",
        lastName: "Xico",
        birthDate: "09/09/1994",
        gender: "Male"
      });

    expect(response.status).toEqual(201);
  });

  test("should throw user already exist", async () => {
    const app = await getServer();

    const user = {
      name: "mt",
      email: "xicoooooodo2@hotmail.com",
      password: "123123",
      lastName: "Xico",
      birthDate: "09/09/1994",
      gender: "Male"
    };

    await request(app)
      .post("/users")
      .send(user);

    expect(
      Promise.reject(
        request(app)
          .post("/users")
          .send(user)
      )
    ).rejects.toThrow("User already exists.");
  });

  afterEach(async () => {
    await CreateDatabaseConnection.cleanAll();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
