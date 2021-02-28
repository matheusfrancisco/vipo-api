import request from "supertest";
import { Connection } from "typeorm";
import { server } from "../../../index";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("integratoin test recomentadion profile", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: Connection;

  beforeEach(async () => {
    userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);
    connection = await CreateDatabaseConnection.createConnection();
    jest.setTimeout(60000);
  });

  it("should create an recommendation user profile", async () => {
    const res1 = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooo1@hotmail.com",
        password: "123123",
        lastName: "Fran",
        birthDate: "09/09/1994",
        gender: "Male"
      });

    const r = await request(serverFactoryWithUserRoute.app)
      .post("/signin")
      .send({
        email: "xicoooooo1@hotmail.com",
        password: "123123"
      });
    const res = await request(serverFactoryWithUserRoute.app)
      .post("/user/recommendation")
      .set({ authorization: `Bearer ${r.body.token}` })
      .send({
        email: "xicooooood2o@hotmail.com",
        howMuch: "R$10 - R$100",
        numberOfPeople: 4,
        like: ["party", "food", "rock"]
      });

    const recomentadion = [
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" },
      { name: "Bar do jao", description: "noite boa" }
    ];
    expect(res.body.recommendations).toEqual(recomentadion);
  });

  afterEach(async () => {
    connection = await CreateDatabaseConnection.createConnection();
    const entities = await connection.entityMetadatas;
    await CreateDatabaseConnection.cleanAll(entities);
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
