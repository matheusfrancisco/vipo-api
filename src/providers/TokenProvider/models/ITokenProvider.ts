export default interface ITokenProvider {
  generateToken(payload: Record<string, unknown>): Promise<string>;
  decodeToken<T = unknown>(token: string): Promise<T>;
}
