import request from "supertest";
import { Connection } from "typeorm";
import { server } from "../../../index";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

xdescribe("integratoin test", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: Connection;

  beforeEach(async () => {
    userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);
    connection = await CreateDatabaseConnection.createConnection();
    jest.setTimeout(60000);
  });

  test("should update user profile", async () => {
    const res1 = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      });

    const r = await request(serverFactoryWithUserRoute.app)
      .post("/signin")
      .send({
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      });

    const res = await request(serverFactoryWithUserRoute.app)
      .patch("/profile")
      .set({ authorization: `Bearer ${r.body.token}` })
      .send({
        email: "xicoooooodo@hotmail.com",
        profileInformations: {
          musicals: ["rock", "ki"],
          foods: ["pasta"],
          drinks: ["coffe", "wine", "juice"]
        }
      });
    expect(res.body.profile.drinks).toEqual(["coffe", "wine", "juice"]);
    expect(res.body.profile.foods).toEqual(["pasta"]);
    expect(res.body.profile.musicals).toEqual(["rock", "ki"]);
  });

  afterEach(async () => {
    const entities = await connection.entityMetadatas;
    await CreateDatabaseConnection.cleanAll(entities);
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
