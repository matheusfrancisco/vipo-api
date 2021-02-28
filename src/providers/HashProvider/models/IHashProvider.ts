export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  hashesMatch(hash: string, expected: string): Promise<boolean>;
}
