import request from "supertest";
import { Connection, getRepository } from "typeorm";
import { server } from "../../../index";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";
import { UserEntity } from "../../infrastructure/entity/user-entity";

describe("integratoin test", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: Connection;
  let repository: any;

  beforeEach(async () => {
    connection = await CreateDatabaseConnection.createConnection();
    userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);
    repository = await getRepository(UserEntity);

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
    connection = await CreateDatabaseConnection.createConnection();
    const entities = await connection.entityMetadatas;
    await CreateDatabaseConnection.cleanAll(entities);
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
