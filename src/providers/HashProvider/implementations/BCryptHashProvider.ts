import bcrypt from "bcrypt";
import IHashProvider from "@providers/HashProvider/models/IHashProvider";

const SALT = 8;

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashPass = await bcrypt.hash(payload, SALT);
    return hashPass;
  }

  public async hashesMatch(hash: string, data: string): Promise<boolean> {
    const result = await bcrypt.compare(data, hash);

    return result;
  }
}
