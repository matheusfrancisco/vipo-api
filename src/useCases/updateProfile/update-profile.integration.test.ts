import { server } from "../../../index";
import request from "supertest";
import { routerFactory } from "../../../routes";
import { CreateDatabaseConnection } from "../../infrastructure/connection";

xdescribe("integratoin test", () => {
  let serverFactoryWithUserRoute: any;
  let userRoutes: any;
  let connection: any;

  beforeEach(async (done) => {
    userRoutes = await routerFactory("test");
    serverFactoryWithUserRoute = await server(userRoutes);
    connection = await CreateDatabaseConnection.createConnection("test");
    jest.setTimeout(60000);
    done()

  });

  test("should update user profile", async (done) => {
    const res1 = await request(serverFactoryWithUserRoute.app)
      .post("/users")
      .send({
        name: "mt",
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      });

    const r = await request(serverFactoryWithUserRoute.app)
      .get('/signin')
      .send({
        email: "xicoooooodo@hotmail.com",
        password: "123123"
      })
    
    const res = await request(serverFactoryWithUserRoute.app)
      .patch("/profile")
      .set({ authorization: `Bearer ${r.body.token}`})
      .send({
        email: "xicoooooodo@hotmail.com",
        "profileInformations": {
            "musicals": ["rock", "ki"],
            "foods": ["pasta"],
            "drinks": ["coffe", "wine", "juice"]
        }
    })
    expect(res.body.profile.drinks).toEqual(["coffe", "wine", "juice"]);
    expect(res.body.profile.foods).toEqual(["pasta"]);
    expect(res.body.profile.musicals).toEqual(["rock", "ki"]);
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
