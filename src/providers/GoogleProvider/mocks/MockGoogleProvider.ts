import IGoogleProvider from "@providers/GoogleProvider/models/IGoogleProvider";
import faker from "faker";
import { v4 as uuid } from "uuid";

export default class MockGoogleProvider implements IGoogleProvider {
  public getUserLoginData = jest.fn(async () => {
    return {
      email: faker.internet.email(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      id: uuid()
    };
  });
}
