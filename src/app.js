import express from "express";
import cors from "cors";
import { router as userRouter } from "./modules/users/users-routes.js";
import { router as tasksRouter } from "./modules/tasks/tasks-routes.js";
import { EXPRESS_APP } from "./core/configs/configs.js";
import {
  apiLoggerMiddleware,
  notFoundErrorHandlerMiddleware,
} from "./core/middlewares/express-middlewares.js";
import { authValidatorMiddleware } from "./core/middlewares/auth-middlewares.js";

const app = express();
const port = EXPRESS_APP.port || 3000;

app.use(cors());
app.use(express.json());

app.use(apiLoggerMiddleware);

app.get("/test", (req, res) => {
  res.json({
    message: "ToDo_Ap app is running",
  });
});

app.use("/api", userRouter);
app.use("/api/tasks", authValidatorMiddleware, tasksRouter);

app.use(notFoundErrorHandlerMiddleware);

app.listen(port, () => {
  console.log(`ToDo_App is running on port ${port}`);
});
