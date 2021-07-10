import { IEntityId } from "@domain/global";
import { IProfileArgs } from "@domain/profile/profile";
import faker from "faker";

const MAX_RANDOM_NUMBER = 50;
const ARRAY_COUNTS = 5;

export default class MockProfile implements IProfileArgs {
  id?: IEntityId;

  user: IEntityId;

  drinks: string[];

  foods: string[];

  musicals: string[];

  constructor({ user, drinks, foods, musicals }: Partial<IProfileArgs> = {}) {
    this.user = user || faker.random.number(MAX_RANDOM_NUMBER);
    this.drinks = drinks || this.generateRandomArray();
    this.foods = foods || this.generateRandomArray();
    this.musicals = musicals || this.generateRandomArray();
  }

  generateRandomArray(): string[] {
    const array: string[] = [];

    for (let i = 0; i < ARRAY_COUNTS; i++) array.push(faker.random.word());

    return array;
  }
}
