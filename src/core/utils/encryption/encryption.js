import bcryptjs from "bcryptjs";
import { BCRYPT_CONFIG } from "../../configs/configs.js";

async function hash(input) {
  try {
    const salt = await bcryptjs.genSaltSync(BCRYPT_CONFIG.rounds);
    const hash = await bcryptjs.hashSync(input, salt);
    return hash;
  } catch (error) {
    throw error;
  }
}

async function hashValidator(input, inputHash) {
  try {
    const validatedHash = await bcryptjs.compareSync(input, inputHash);
    return validatedHash;
  } catch (error) {
    throw error;
  }
}

export { hash, hashValidator };
