import { jwtValidator } from "../auth/jwt-auth.js";

const authValidatorMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Authorization header is missing!");
    }

    const userJwtToken = authHeader.split(" ")[1];

    if (!userJwtToken) {
      throw new Error("JWT Token is missing!");
    }

    const tokenData = jwtValidator(userJwtToken);
    req.userTokenData = tokenData;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
};

export { authValidatorMiddleware };
