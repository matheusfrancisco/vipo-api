export interface IGenerateTokenOptions {
  expiresIn?: string;
}

export default interface ITokenProvider {
  generateToken(
    payload: Record<string, unknown>,
    options?: IGenerateTokenOptions
  ): Promise<string>;
  decodeToken<T = unknown>(token: string): Promise<T>;
}
