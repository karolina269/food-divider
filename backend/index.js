const config = require("./config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose.connect("mongodb://127.0.0.1:27017/food-divider");

// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const dishRouter = require("./app/router/dishRouter");
app.use("/dishes", dishRouter);

const eaterRouter = require("./app/router/eaterRouter");
app.use("/eaters", eaterRouter);

const userRouter = require("./app/router/userRouter");
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(config.app.port, () => {
  console.log("express server is up");
});
