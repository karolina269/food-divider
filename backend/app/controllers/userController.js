const User = require("../models/UserModel");

module.exports = {
  show: (req, res) => {
    User.findOne(req.params.id)
      .then(() => {
        res.json(req);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  create: (req, res) => {
    const newUser = User(req.body);
    newUser
      .save()
      .then(() => {
        res.json(req);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        bcrypt.compare(req.body.password, user.password, (err, logged) => {
          if (err) {
            res.json({
              error: true,
              message: "Login error",
              user: { email: req.body.email, password: "" },
            });
            return;
          }

          if (logged) {
            const token = user.generateAuthToken(user);
            res.cookie("AuthToken", token);
            res.redirect("/");
          } else {
            res.json({
              error: true,
              message: "Login data do not match",
              user: { email: req.body.email, password: "" },
            });
            return;
          }
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  logout: (_req, res) => {
    // res.clearCookie("AuthToken");
    // res.redirect('/user/login');
  },
  delete: (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json(req);
        // res.clearCookie("AuthToken");
        // res.redirect('/user/login');
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
