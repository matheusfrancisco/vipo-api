import request from "supertest";
import { routerFactory } from "@infrastructure/routes";
import { server } from "../../index";
import express from "express";


describe("health check", () => {
  let serverFactoryWithUserRoute: { app: express.Express };

  beforeAll(async () => {
    const userRoutes = await routerFactory();
    serverFactoryWithUserRoute = await server(userRoutes);

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
