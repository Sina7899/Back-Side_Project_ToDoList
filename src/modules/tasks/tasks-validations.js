import Joi from "joi";

const tasksInfoByUserIdValidator = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      userId: Joi.number().required(),
    }).required();

    const validatedParams = await paramsSchema.validateAsync(req.params);
    req.validatedParams = validatedParams;
    console.log(validatedParams);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createTaskValidator = async (req, res, next) => {
  const bodySchema = Joi.object({
    userId: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
  }).required();

  try {
    const validatedParams = await bodySchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.validatedParams = validatedParams;
    next();
  } catch (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({ errors: errorMessages });
  }
};

const updateTaskValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      taskId: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.boolean().required(),
    }).required();

    const validatedParams = await bodySchema.validateAsync(req.body, {
      abortEarly: false,
    });
    req.validatedParams = validatedParams;
    console.log(validatedParams);
    next();
  } catch (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({ errors: errorMessages });
  }
};

const deleteTaskValidator = async (req, res, next) => {
  try {
    const paramsSchema = Joi.object({
      taskId: Joi.number().required(),
    }).required();

    const validatedParams = await paramsSchema.validateAsync(req.params);
    req.validatedParams = validatedParams;
    console.log(validatedParams);
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  tasksInfoByUserIdValidator,
  createTaskValidator,
  updateTaskValidator,
  deleteTaskValidator,
};
