const Eater = require("../models/EaterModel");
const User = require("../models/UserModel");

module.exports = {
  index: (req, res) => {
    const findConfig = req.query.userId ? { user: req.query.userId } : {};
    Eater.find(findConfig)
      .populate("user")
      .then((eaters) => {
        res.status(200).json(eaters);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  show: (req, res) => {
    Eater.findById(req.params.id)
      .populate("user")
      .then((eater) => {
        res.send(eater);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  create: (req, res) => {
    const newEater = new Eater({ ...req.body, user: req.userId });
    newEater.save();
    User.updateOne({ _id: req.userId }, { $push: { eaters: newEater._id } }).catch((err) => {
      res.status(500).json({ error: err });
    });
    res.status(201).json(newEater);
  },
  update: (req, res) => {
    Eater.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.status(204);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  delete: (req, res) => {
    Eater.findByIdAndDelete(req.params.id)
      .populate("user")
      .then((eater) => {
        User.updateOne({ _id: eater.user._id }, { $pull: { eaters: req.params.id } }).catch((err) => {
          res.status(500).json({ error: err });
        });
        res.status(204);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
