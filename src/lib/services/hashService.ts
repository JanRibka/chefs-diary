import { hash } from "bcrypt";

/**
 * Hashes password
 * @param password Password to hash
 * @returns {Promise<string>}
 */
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}
