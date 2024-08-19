import express from "express";

import {
  createUserValidator,
  loginUserValidator,
} from "./users-validations.js";

import {
  createUserController,
  loginUserController,
} from "./users-controllers.js";

const router = express.Router();

router.post("/signup", createUserValidator, createUserController);
router.post("/login", loginUserValidator, loginUserController);

export { router };
