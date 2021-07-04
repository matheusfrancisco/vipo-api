import Profile from "@domain/profile/Profile";
import faker from "faker";

const MAX_RANDOM_NUMBER = 50;
const ARRAY_COUNTS = 5;

export default class MockProfile extends Profile {
  constructor({ user, drinks, foods, musicals }: Partial<Profile> = {}) {
    super({
      user: user || faker.random.number(MAX_RANDOM_NUMBER),
      drinks: drinks || faker.random.arrayElements(ARRAY_COUNTS),
      foods: foods || faker.random.arrayElements(ARRAY_COUNTS),
      musicals: musicals || faker.random.arrayElements(ARRAY_COUNTS)
    });
  }
}
