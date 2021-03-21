import IGoogleProvider from "@providers/GoogleProvider/models/IGoogleProvider";
import faker from "faker";
import { v4 as uuid } from "uuid";

export default class MockUserProvider implements IGoogleProvider {
  public getUserLoginData = jest.fn(async () => {
    return {
      email: faker.internet.email(),
      id: uuid()
    };
  });
}
