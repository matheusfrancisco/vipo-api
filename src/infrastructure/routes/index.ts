import { Router } from "express";
import { CreateDatabaseConnection } from "@infrastructure/database/connection";

export const routerFactory = async (): Promise<Router> => {
  await CreateDatabaseConnection.createConnection();
  const router = Router();

  const userRoutes = (await import("@infrastructure/routes/user")).default;
  const profileRoutes = (await import("@infrastructure/routes/profile"))
    .default;
  const signinRoutes = (await import("@infrastructure/routes/signin")).default;
  const buildHealthCheck = (await import("@infrastructure/routes/healthcheck"))
    .default;

  const healthcheckRoutes = await buildHealthCheck();

  router.use("/users", userRoutes);

  router.use("/profiles", profileRoutes);

  router.use("/signin", signinRoutes);

  router.use("/healthcheck", healthcheckRoutes);

  return router;
};
