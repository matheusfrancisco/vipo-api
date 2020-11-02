import { server } from "../../../index";
import request from "supertest";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("integratoin test", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: any;

  beforeEach(async () => {
    userRoutes = await routerFactory("test");
    const { app } = await server(userRoutes);
    connection = await CreateDatabaseConnection.createConnection("test");
    serverFactoryWithUserRoute = app;
  });

  it("should register a user", async () => {
    const entities = await connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.delete({})
    });
    const res = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo1@hotmail.com",
        password: "123123"
      });

    expect(res.status).toEqual(201);
  });

  it("should throw  user already exist", async () => {
    const entities = await connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.delete({})
    });
    const res = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      });

    const res2 = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      });

    expect(res2.body.message).toEqual("User already exists.");
  });


  afterEach(async () => {
    connection = CreateDatabaseConnection.getConnection('test');
    if(!connection) {
      connection = await CreateDatabaseConnection.createConnection('test');
      
    }
    const entities = await connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.delete({})
    });

  });
});
