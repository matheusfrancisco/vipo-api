import { server } from "../../../index";
import request from "supertest";
import { routerFactory } from "../../../routes";
import { getRepository } from "typeorm";
import { UserEntity } from "../../infrastructure/entity/user-entity";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("integratoin test", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: any;

  beforeEach(async () => {
    userRoutes = await routerFactory("test");
    const { app } = server(userRoutes);
    connection = CreateDatabaseConnection.getConnection("test");
    serverFactoryWithUserRoute = app;
    
    connection = CreateDatabaseConnection.getConnection('test');

    const entities = connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  });

  it("should register a user", async () => {
    const res = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      });

    expect(res.status).toEqual(201);
  });

  it("should throw  user already exist", async () => {
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


  afterEach(async () => {});
});
