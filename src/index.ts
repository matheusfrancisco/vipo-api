import handleInternalServerError from "./infrastructure/middlewares/handleInternalServerError";
import handleServiceError from "./infrastructure/middlewares/handleServiceError";
import { routerFactory } from "./infrastructure/routes";
import express, { Router, Express } from "express";

export const server = async (
  router: Router
): Promise<{ app: Express }> => {
  await import("express-async-errors");

  const app = express();

  app.use(express.json());
  app.use(router);

  app.use(handleServiceError);
  app.use(handleInternalServerError);

  return { app };
};

export const startServer = async (): Promise<void> => {
  const router = await routerFactory();
  const { app } = await server(router);

  app.listen(3000, () => {
    console.log("Server running");
  });
};


export const createHttpApp = async (): Promise<Express> => {
  const router = await routerFactory();
  const { app } = await server(router);

  return app;
};
