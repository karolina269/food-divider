const Diner = require("../models/DinerModel");
const User = require("../models/UserModel");

module.exports = {
  index: (req, res) => {
    const findConfig = req.userId ? { user: req.userId } : {};
    Diner.find(findConfig)
      .populate("user")
      .then((diners) => {
        res.status(200).json(diners);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  create: (req, res) => {
    const newDiner = new Diner({ ...req.body, user: req.userId });
    newDiner.save();
    User.updateOne({ _id: req.userId }, { $push: { diners: newDiner._id } }).catch((err) => {
      res.status(500).json({ error: err });
    });
    res.status(201).json(newDiner);
  },
  update: (req, res) => {
    Diner.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.status(200).json({ message: "Diner has been updated" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  delete: (req, res) => {
    Diner.findByIdAndDelete(req.params.id)
      .populate("user")
      .then((diner) => {
        User.updateOne({ _id: diner.user._id }, { $pull: { diners: req.params.id } }).catch((err) => {
          res.status(500).json({ error: err });
        });
        res.status(200).json({ message: "Diner has been deleted" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
