import { server } from "../../../index";
import request from "supertest";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

describe("integratoin test recomentadion profile", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: any;

  beforeEach(async (done) => {
    userRoutes = await routerFactory("test");
    const { app } =  await server(userRoutes);
    connection = await CreateDatabaseConnection.createConnection("test");
    serverFactoryWithUserRoute = app;
    jest.setTimeout(60000);
    done()
  });

  test("should create an recommendation user profile", async (done) => {
    const res1 = await request(serverFactoryWithUserRoute)
      .post("/users")
      .send({
        name: "mt",
        email: "xicooooood2o@hotmail.com",
        password: "123123"
      });

    const r = await request(serverFactoryWithUserRoute)
      .get('/signin')
      .send({
        email: "xicooooood2o@hotmail.com",
        password: "123123"
      })
    
    const res = await request(serverFactoryWithUserRoute)
      .post("/user/recommendation")
      .set({ authorization: `Bearer ${r.body.token}`})
      .send({
        email: "xicooooood2o@hotmail.com",
        "howMuch": "R$10 - R$100",
        "numberOfPeople": 4,
        "like": ["party", "food", "rock"]  
    })

    const recomentadion = [
      { "name": "Bar do jao", "description": "noite boa"},
      { "name": "Bar do jao", "description": "noite boa"},
      { "name": "Bar do jao", "description": "noite boa"},
    ]
    expect(res.body.recommendations).toEqual(recomentadion);
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
