const Dish = require("../models/DishModel");
const User = require("../models/UserModel");

module.exports = {
  //index - wyswietl wszystkie naczynia zalogowanego użytkownika
  index: (req, res) => {
    Dish.find({ user: "647c9f5d7f1b97e42a36e4e2" })
      .then((dishes) => {
        res.json(dishes);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  show: (req, res) => {
    Dish.findById(req.params.id)
      .then((dish) => {
        res.json(dish);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  create: (req, res) => {
    const newDish = new Dish({ ...req.body, user: "647c9f5d7f1b97e42a36e4e2" });
    newDish
      .save()
      .then(() => {
        User.updateOne({ _id: "647c9f5d7f1b97e42a36e4e2" }, { $push: { dishes: newDish._id } })
          .then(() => {
            res.json(newDish);
          })
          .catch((err) => {
            res.json(err);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  },
  update: (req, res) => {
    Dish.findByIdAndUpdate(req.params.id, req.body)
      .then((dish) => {
        res.json(dish);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  select: (req, res) => {
    Dish.findByIdAndUpdate(req.params.id, { selected: true })
      .then((dish) => {
        res.json(dish);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  unselect: (req, res) => {
    Dish.findByIdAndUpdate(req.params.id, { selected: false })
      .then((dish) => {
        res.json(dish);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  delete: (req, res) => {
    Dish.findByIdAndDelete(req.params.id, { user: "647c9f5d7f1b97e42a36e4e2" })
      .then(() => {
        User.updateOne({ _id: "647c9f5d7f1b97e42a36e4e2" }, { $pull: { dishes: req.params.id } });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
