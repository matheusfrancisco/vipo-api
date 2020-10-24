/* Fix test create integration 
create server.ts to use in test */

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
  let repositoryCustomerTest: any;

  beforeEach(async () => {
    userRoutes = await routerFactory();
    const { app } = server(userRoutes);
    connection = CreateDatabaseConnection.getConnection();
    serverFactoryWithUserRoute = app;
    repositoryCustomerTest = getRepository(UserEntity);
    await repositoryCustomerTest.delete({});
  });

  afterEach(async () => {
    await repositoryCustomerTest.delete({});
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
});
