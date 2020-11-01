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
    const { app } = server(userRoutes);
    connection = await CreateDatabaseConnection.createConnection("test");
    serverFactoryWithUserRoute = app;
    
    connection = CreateDatabaseConnection.getConnection('test');

    const entities = connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  });

  it("should update user profile", async () => {
    const res1 = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      });
    
    const res = await request(serverFactoryWithUserRoute)
      .patch("/profile")
      .send({
        "email": "xicoooooodo@hotmail.com",
        "profileInformations": {
            "musicals": ["rock", "ki"],
            "foods": ["pasta"],
            "drinks": ["coffe", "wine", "juice"]
        }
    })

    expect(res.body.profile.drinks).toEqual(["coffe", "wine", "juice"]);
    expect(res.body.profile.foods).toEqual(["pasta"]);
    expect(res.body.profile.musicals).toEqual(["rock", "ki"]);
  });


  afterEach(async () => {
    connection = CreateDatabaseConnection.getConnection('test');

    const entities = connection.entityMetadatas;

    entities.forEach(async (entity: any) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  });
});
