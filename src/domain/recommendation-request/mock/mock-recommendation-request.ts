import { IEntityId } from "@domain/global";
import { IRecommendationRequestArgs } from "@domain/recommendation-request/recommendation-request";
import faker from "faker";

const MAX_RANDOM_NUMBER = 50;
const ARRAY_COUNTS = 5;

export default class MockRecommendationRequest
  implements IRecommendationRequestArgs {
  public userId: IEntityId;

  public numberOfPeople: number;

  public howMuch: string;

  public like: string[];

  constructor({
    userId,
    numberOfPeople,
    howMuch,
    like
  }: Partial<IRecommendationRequestArgs> = {}) {
    this.userId = userId || faker.datatype.number(MAX_RANDOM_NUMBER);
    this.numberOfPeople =
      numberOfPeople || faker.datatype.number(MAX_RANDOM_NUMBER);
    this.howMuch = howMuch || String(faker.datatype.float(MAX_RANDOM_NUMBER));
    this.like = like || this.generateRandomArray();
  }

  generateRandomArray(): string[] {
    const array: string[] = [];

    for (let i = 0; i < ARRAY_COUNTS; i++) array.push(faker.random.word());

    return array;
  }
}
