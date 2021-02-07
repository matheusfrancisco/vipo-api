import { server } from "../../../index";
import request from "supertest";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";
import { UserEntity } from "../../infrastructure/entity/user-entity";
import { getRepository } from "typeorm";

describe("integratoin test", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: any;
  let repository: any;

  beforeEach(async (done) => {
    userRoutes = await routerFactory("test");
    serverFactoryWithUserRoute = await server(userRoutes);
    connection = await CreateDatabaseConnection.createConnection("test");
    repository = await getRepository(UserEntity);

    jest.setTimeout(60000);
    done()
  });

  test("should register a user", async (done) => {

    const res = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo1@hotmail.com",
        password: "123123",
        lastName: "Xico",
        birthDate: "09/09/1994",
        gender: "Male",
      });

    expect(res.status).toEqual(201);
    done()
  });

  test("should throw  user already exist", async (done) => {

    const res = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo2@hotmail.com",
        password: "123123",
        lastName: "Xico",
        birthDate: "09/09/1994",
        gender: "Male",
      });

    const res2 = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo2@hotmail.com",
        password: "123123",
        lastName: "Xico",
        birthDate: "09/09/1994",
        gender: "Male",
      });

    expect(res2.body.message).toEqual("User already exists.");
    done()

  });


  afterEach(async () => {
    connection = await CreateDatabaseConnection.createConnection("test");
    const entities = await connection.entityMetadatas;
    await CreateDatabaseConnection.cleanAll(entities)
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
