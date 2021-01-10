import express from "express";
import { routerFactory } from "./routes";

export const server = async (router: any) => {
  const app = await express();

  app.use(express.json());
  app.use(router);
  return { app } ;
};

export const startServer = async () => {
  const router = await routerFactory('prod');
  const { app } = await server(router);
  app.listen(3000, () => {
    console.log("Server running");
  });
};
