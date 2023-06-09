const Dish = require("../models/DishModel");
const User = require("../models/UserModel");

module.exports = {
  index: (req, res) => {
    const findConfig = req.userId ? { user: req.userId } : {};
    Dish.find(findConfig)
      .populate("user")
      .then((dishes) => {
        res.status(200).json(dishes);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  create: (req, res) => {
    const newDish = new Dish({ ...req.body, user: req.userId });
    newDish.save();
    User.updateOne({ _id: req.userId }, { $push: { dishes: newDish._id } }).catch((err) => {
      res.status(500).json({ error: err });
    });
    res.status(201).json({ newDish, message: "Dish has been added" });
  },
  update: (req, res) => {
    Dish.findByIdAndUpdate(req.params.id, req.body)
      .then(() => {
        res.status(200).json({ message: "Dish has been updated" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
  delete: (req, res) => {
    Dish.findByIdAndDelete(req.params.id)
      .populate("user")
      .then((dish) => {
        User.updateOne({ _id: dish.user._id }, { $pull: { dishes: req.params.id } }).catch((err) => {
          res.status(500).json({ error: err });
        });
        res.status(200).json({ message: "Dish has been deleted" });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
