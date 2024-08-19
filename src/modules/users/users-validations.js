import Joi from "joi";

const createUserValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      username: Joi.string().min(3).required(),
      password: Joi.string()
        .min(5)
        .max(10)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    }).required();

    const validatedBody = await bodySchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.validatedBody = validatedBody;
    next();
  } catch (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    console.error(errorMessages);
    res.status(400).json({ errors: errorMessages });
  }
};

const loginUserValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      username: Joi.string().min(3).required(),
      password: Joi.string().min(5).required(),
    }).required();

    const validatedBody = await bodySchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.validatedBody = validatedBody;
    next();
  } catch (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    console.error(errorMessages);
    res.status(400).json({ errors: errorMessages });
  }
};

export { createUserValidator, loginUserValidator };
