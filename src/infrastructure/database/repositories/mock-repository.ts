interface IMockRepository {
  getCurrentRecommendations(id: number): any;
}

export default class MockRepository implements IMockRepository {
  public async getCurrentRecommendations(id: number): Promise<any> {
    return [{ id }];
  }
}
