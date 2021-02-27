import express, { Router } from "express";
import { routerFactory } from "./routes";

export const server = async (router: Router) => {
  const app = await express();

  app.use(express.json());
  app.use(router);
  return { app };
};

export const startServer = async (): Promise<void> => {
  const router = await routerFactory("prod");
  const { app } = await server(router);

  app.listen(3000, () => {
    console.log("Server running");
  });
};
