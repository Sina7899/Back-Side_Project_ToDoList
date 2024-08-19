import bcrypt from "bcrypt";
import { BCRYPT_CONFIG } from "../../configs/configs.js";

async function hash(input) {
  try {
    const salt = await bcrypt.genSalt(BCRYPT_CONFIG.rounds);
    const hash = await bcrypt.hash(input, salt);
    return hash;
  } catch (error) {
    throw error;
  }
}

async function hashValidator(input, inputHash) {
  try {
    const validatedHash = await bcrypt.compare(input, inputHash);
    return validatedHash;
  } catch (error) {
    throw error;
  }
}

export { hash, hashValidator };
