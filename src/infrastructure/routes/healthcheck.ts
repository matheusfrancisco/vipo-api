import { HealthCheckUseCaseFactory } from "@useCases/HealthCheck";
import { Router } from "express";

const {
  livenessController,
  healthCheckController
} = HealthCheckUseCaseFactory.build();
const healthcheckRoutes = Router();

healthcheckRoutes.get("/liveness", (request, response) => {
  return livenessController.handle(request, response);
});

healthcheckRoutes.get("/readness", async (request, response) => {
  return healthCheckController.handle(request, response);
});

export default healthcheckRoutes;
