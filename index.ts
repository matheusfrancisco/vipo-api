import express from "express";
import { routerFactory } from "./routes";

export const server = (router: any) => {
  const app = express();

  app.use(express.json());
  app.use(router);
  return { app };
};

export const startServer = async () => {
  const router = await routerFactory();
  const { app } = server(router);
  app.listen(3000, () => {
    console.log("Server running");
  });
};
