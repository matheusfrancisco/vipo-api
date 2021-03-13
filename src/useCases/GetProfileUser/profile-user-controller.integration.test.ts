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
    userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);
    repository = await getRepository(UserEntity);

    jest.setTimeout(60000);
  });

  test("should register a user and get all profile informations", async () => {
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

    const r = await request(serverFactoryWithUserRoute.app)
      .post("/signin")
      .send({
        email: "xicoooooodo1@hotmail.com",
        password: "123123"
      });
    const email = "xicoooooodo1@hotmail.com";
    // # is this the best options, or we can get the email fron jwt?
    const profileUserInfo = await request(serverFactoryWithUserRoute.app)
      .get(`/profile/${email}`)
      .set({ authorization: `Bearer ${r.body.token}` });

    expect(res.status).toEqual(200);
    expect(profileUserInfo.body).toEqual({
      name: "mt",
      lastName: "Xico",
      birthDate: "09/09/1994",
      gender: "Male",
      profileInformations: {
        // musicals: ["rock", "ki"],
        // foods: ["pasta"],
        // drinks: ["coffe", "wine", "juice"]
      }
    });
  });

  afterEach(async () => {
    connection = await CreateDatabaseConnection.createConnection();
    const entities = await connection.entityMetadatas;
    await CreateDatabaseConnection.cleanAll(entities);
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
});
