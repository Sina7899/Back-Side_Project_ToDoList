import {
  createUserService,
  validateUserLoginService,
} from "../../services/users/users-services.js";

import "dotenv/config";

const TABLE = process.env.TABLE_2;

const createUserController = async (req, res, next) => {
  try {
    const { firstName, lastName, username, password } = req.validatedBody;
    const createdTask = await createUserService(
      TABLE,
      firstName,
      lastName,
      username,
      password
    );
    if (createdTask === null) {
      res.status(500).json({
        message: `"User Create Failed!"`,
      });
    } else {
      res.status(201).json({ message: "User created successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { username, password } = req.validatedBody;
    const jwt = await validateUserLoginService(TABLE, username, password);
    res.status(200).json({ jwt: jwt });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: error.message,
    });
  }
};

export { createUserController, loginUserController };
