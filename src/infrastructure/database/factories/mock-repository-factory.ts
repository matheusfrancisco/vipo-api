import MockRepository from "../repositories/mock-repository";

export default class MockRepositoryFactory {
  public static make(): any {
    return new MockRepository();
  }
}
