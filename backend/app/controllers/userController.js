const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports = {
  create: (req, res) => {
    const newUser = User(req.body);
    newUser
      .save()
      .then((user) => {
        const token = user.generateAuthToken(user);
        res.status(201).json({ message: "Account created", jwt: token, email: newUser.email });
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.status(409).json({
            error: true,
            message: "User already exists",
          });
        }
      });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.status(400).json({
            error: true,
            message: "User does not exist",
          });
          return;
        }

        bcrypt.compare(req.body.password, user.password, (err, logged) => {
          if (err) {
            res.status(500).json({
              error: true,
              message: "Login error",
            });
            return;
          }

          if (logged) {
            const token = user.generateAuthToken(user);
            res.status(200).json({
              email: user.email,
              jwt: token,
            });
          } else {
            res.status(400).json({
              error: true,
              message: "Login data do not match",
            });
            return;
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  delete: (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(204);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
