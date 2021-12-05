export class MockUseCase {
  constructor(private mockRepository: any) {}

  public async execute(id: number): Promise<any> {
    const recommendations = await this.mockRepository.getCurrentRecommendation(
      id
    );

    if (!recommendations) return [];
    return [...recommendations];
  }
}
