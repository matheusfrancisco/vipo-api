import IHashProvider from "@providers/HashProvider/models/IHashProvider";

export default class MockHashProvider implements IHashProvider {
  public generateHash = jest.fn(async payload => payload);

  public hashesMatch = jest.fn(
    async (payload, expected) => payload === expected
  );
}
