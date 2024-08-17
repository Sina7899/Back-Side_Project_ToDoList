const apiLoggerMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.path}`);
  next();
};

const notFoundErrorHandlerMiddleware = (req, res, next) => {
  res.status(404).json({ message: `the route ${req.path} is not found.` });
};

export { apiLoggerMiddleware, notFoundErrorHandlerMiddleware };
