import { getManager } from "typeorm";
import { Liveness } from "./liveness-controller";
import { HealthCheck } from "./readness-controller";

interface IBuildResult {
  livenessController: Liveness;
  healthCheckController: HealthCheck;
}

export class HealthCheckUseCaseFactory {
  public static build(): IBuildResult {
    const queryManager = getManager();
    const livenessController = new Liveness();
    const healthCheckController = new HealthCheck(queryManager);

    return { livenessController, healthCheckController };
  }
}
