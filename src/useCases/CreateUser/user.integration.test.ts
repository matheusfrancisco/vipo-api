import { server } from "../../../index";
import request from "supertest";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";
import { UserEntity } from "../../infrastructure/entity/user-entity";
import { getRepository } from "typeorm";

xdescribe("integratoin test", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: any;
  let repository: any;

  beforeEach(async (done) => {
    userRoutes = await routerFactory("test");
    const { app } = await server(userRoutes);
    connection = await CreateDatabaseConnection.createConnection("test");
    repository = await getRepository(UserEntity);

    serverFactoryWithUserRoute = app;
    jest.setTimeout(30000);
    done()
  });

  test("should register a user", async () => {

    const res = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo1@hotmail.com",
        password: "123123"
      });

    expect(res.status).toEqual(201);
  });

  test("should throw  user already exist", async () => {

    const res = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo2@hotmail.com",
        password: "123123"
      });

    const res2 = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo2@hotmail.com",
        password: "123123"
      });

    expect(res2.body.message).toEqual("User already exists.");
  });


  afterEach(async () => {
    connection = await CreateDatabaseConnection.createConnection("test");
    const entities = await connection.entityMetadatas;
    await CreateDatabaseConnection.cleanAll(entities)
    jest.clearAllMocks(); 
    jest.resetAllMocks();
  });
});
