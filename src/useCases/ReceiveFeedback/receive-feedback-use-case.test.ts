import MockUserRepository from "@domain/user/mocks/mock-user-repository";
import IReceiveFeedbackDTO from "@useCases/ReceiveFeedback/receive-feedback-dto";
import { ReceiveFeedbackUseCase } from "@useCases/ReceiveFeedback/receive-feedback-use-case";
import faker from "faker";

const getFakeFeedback = (): IReceiveFeedbackDTO => ({
  userId: faker.random.number(200),
  establishmentId: faker.random.number(200),
  bestRatedItem: faker.music.genre(),
  leastRatedItem: faker.music.genre(),
  rating: faker.random.number(5),
  comments: faker.random.words()
});

describe("Profile User Use Case", () => {
  it("should throw if the user doesnt exist", async () => {
    const usersRepository = new MockUserRepository();
    usersRepository.receiveFeedback = jest.fn(() =>
      Promise.reject(new Error("User does not exist"))
    );
    const useCase = new ReceiveFeedbackUseCase(usersRepository);

    const feedback = getFakeFeedback();

    await expect(useCase.execute(feedback)).rejects.toThrow();
  });

  it("should register the feedback correctly", async () => {
    const usersRepository = new MockUserRepository();
    const useCase = new ReceiveFeedbackUseCase(usersRepository);

    const feedback = getFakeFeedback();

    await expect(useCase.execute(feedback)).resolves.not.toBeDefined();
  });
});
