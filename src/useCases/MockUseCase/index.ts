import MockRepositoryFactory from "@infrastructure/database/factories/mock-repository-factory";
import { MockController } from "./mock-controller";
import { MockUseCase } from "./mock-use-case";

export class MockUseCaseExempleFacotry {
  public static build(): any {
    const mockRepository = MockRepositoryFactory.make();

    const mockUseCase = new MockUseCase(mockRepository);

    const mockController = new MockController(mockUseCase);

    return { mockController };
  }
}
