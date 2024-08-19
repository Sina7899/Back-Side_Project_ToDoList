import jwt from "jsonwebtoken";
import { JWT_SECRETS } from "../secrets/secrets.js";

function jwtSign(dataObject) {
  return jwt.sign(dataObject, JWT_SECRETS.signKey);
}

function jwtValidator(jwtToken) {
  try {
    const verifiedJWT = jwt.verify(jwtToken, JWT_SECRETS.signKey);
    return verifiedJWT;
  } catch (error) {
    console.log(error);
    throw new Error("Invalid JWT Token!");
  }
}

export { jwtSign, jwtValidator };
