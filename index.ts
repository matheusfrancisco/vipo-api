import express from "express";
import { routerFactory } from "./routes";

(async () => {
  const app = express();

  const router = await routerFactory();
  app.use(express.json());
  app.use(router);

  app.listen(3000, () => {});
})();
