import { Router } from "express";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import userRoutes from "@infrastructure/routes/user";
import profileRoutes from "@infrastructure/routes/profile";
import signinRoutes from "@infrastructure/routes/signin";
import buildHealthCheck from "@infrastructure/routes/healthcheck";

export const routerFactory = async (): Promise<Router> => {
  await CreateDatabaseConnection.createConnection();
  const healthcheckRoutes = await buildHealthCheck();
  const router = Router();

  router.use("/users", userRoutes);

  router.use("/profiles", profileRoutes);

  router.use("/signin", signinRoutes);

  router.use("/healthcheck", healthcheckRoutes);

  return router;
};
