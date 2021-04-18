import { Router } from "express";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";
import userRoutes from "@infrastructure/routes/user";
import profileRoutes from "@infrastructure/routes/profile";
import signinRoutes from "@infrastructure/routes/signin";

export const routerFactory = async (): Promise<Router> => {
  await CreateDatabaseConnection.createConnection();

  const router = Router();

  router.use("/users", userRoutes);

  router.use("/profiles", profileRoutes);

  router.use("/signin", signinRoutes);

  return router;
};
