const express = require("express");
import cors from "cors";
import errorHandler from "@middlewares/error-handler";
import authControllerRouter from "@controllers/auth.controller";
import customerRouter from "@routes/customer.route";
import userRouter from "@routes/user.route";
function createServer() {
  const app = express();
  app.use(cors());
  app.options("*", cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api", userRouter);
  app.use("/api", authControllerRouter);
  app.use("/api", customerRouter);

  app.use(errorHandler);
  return app;
}
export default createServer;
