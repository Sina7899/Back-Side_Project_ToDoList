import {
  createUser,
  getUserInfoByUsername,
} from "../../model/users/users-models.js";
import { hashValidator, hash } from "../../core/utils/encryption/encryption.js";
import { jwtSign } from "../../core/auth/jwt-auth.js";

async function createUserService(
  table,
  firstName,
  lastName,
  username,
  password
) {
  const encryptedPassword = await hash(password);
  const createdUser = await createUser(
    table,
    firstName,
    lastName,
    username,
    encryptedPassword
  );
  if (
    createdUser === null ||
    createdUser === undefined ||
    Object.values(createdUser).length === 0
  ) {
    return null;
  }
  return createdUser;
}

async function validateUserLoginService(table, username, password) {
  const user = await getUserInfoByUsername(table, username);
  if (!user) {
    throw new Error(`Username or Password is not correct.`);
  }

  const validatedHash = await hashValidator(password, user.password_hash);
  if (!validatedHash) {
    throw new Error(`Username or Password is not correct.`);
  }

  const jwtUserData = {
    userId: user.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
  };

  const userJwt = jwtSign(jwtUserData);
  return userJwt;
}

export { createUserService, validateUserLoginService };
