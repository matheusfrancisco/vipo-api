import request from "supertest";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import { routerFactory } from "@infrastructure/routes";
import { server } from "../../index";

describe("health check", () => {
  let serverFactoryWithUserRoute: { app: Express.Application };

  beforeEach(async () => {
    const userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);

    jest.setTimeout(60000);
  });

  test("should call liveness with success", async () => {
    const lv = await request(serverFactoryWithUserRoute.app).get(
      "/healthcheck/liveness"
    );
    expect(lv.body).toEqual({ check: "liveness" });
  });

  test("should call readness with success", async () => {
    const rd = await request(serverFactoryWithUserRoute.app).get(
      "/healthcheck/readness"
    );
    expect(rd.body).toEqual({ check: "database on" });
  });
});
