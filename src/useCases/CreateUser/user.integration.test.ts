import request from "supertest";
import { server } from "../../../index";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("integratoin test", () => {
  let serverFactoryWithUserRoute: any;

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

    expect(res.status).toEqual(201);
  });

  test("should throw  user already exist", async () => {
    const res = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo2@hotmail.com",
        password: "123123",
        lastName: "Xico",
        birthDate: "09/09/1994",
        gender: "Male"
      });

    const res2 = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo2@hotmail.com",
        password: "123123",
        lastName: "Xico",
        birthDate: "09/09/1994",
        gender: "Male"
      });

    expect(res2.body.message).toEqual("User already exists.");
  });

  afterEach(async () => {
    const connection = await CreateDatabaseConnection.createConnection();
    const entities = await connection.entityMetadatas;
    await CreateDatabaseConnection.cleanAll(entities);
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
