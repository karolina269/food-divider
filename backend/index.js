require("dotenv").config();
const config = require("./config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://127.0.0.1:27017/food-divider");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const authMiddleware = require("./app/middlewares/authMiddleware");

const dishRouter = require("./app/router/dishRouter");
app.use("/dishes", authMiddleware, dishRouter);

const dinerRouter = require("./app/router/dinerRouter");
app.use("/diners", authMiddleware, dinerRouter);

const userRouter = require("./app/router/userRouter");
app.use("/user", userRouter);

app.listen(process.env.APP_PORT || 3005, () => {
  console.log("express server is up, port: ", process.env.APP_PORT || 3005);
});
