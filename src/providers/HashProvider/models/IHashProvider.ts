export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;

  /**
   *
   * @param hash The already hashed data to be compared
   * @param data The data to be encrypted and compared
   */
  hashesMatch(hash: string, data: string): Promise<boolean>;
}
