const Eater = require("../models/EaterModel");
const User = require("../models/UserModel");

module.exports = {
  //index - wyswietl zjadaczy zalogowanego użytkownika
  index: (req, res) => {
    Eater.find({ user: "647c9f5d7f1b97e42a36e4e2" })
      .then((eaters) => {
        res.json(eaters);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  show: (req, res) => {
    Eater.findById(req.params.id)
      .then((eater) => {
        res.send(eater);
      })
      .catch((err) => {
        res.json(err);
      });
  },
  create: (req, res) => {
    const newEater = new Eater({ ...req.body, user: "647c9f5d7f1b97e42a36e4e2" });
    newEater
      .save()
      .then(() => {
        User.updateOne({ _id: "647c9f5d7f1b97e42a36e4e2" }, { $push: { eaters: newEater._id } })
          .then(() => {
            res.json(newEater);
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
    Eater.findByIdAndUpdate(req.params.id, req.body)
      .then((eater) => {
        res.json(eater);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  select: (req, res) => {
    Eater.findByIdAndUpdate(req.params.id, { selected: true })
      .then((eater) => {
        res.json(eater);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  unselect: (req, res) => {
    Eater.findByIdAndUpdate(req.params.id, { selected: false })
      .then((eater) => {
        res.json(eater);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  delete: (req, res) => {
    Eater.findByIdAndDelete(req.params.id, { user: "647c9f5d7f1b97e42a36e4e2" })
      .then(() => {
        User.updateOne({ _id: "647c9f5d7f1b97e42a36e4e2" }, { $pull: { eater: req.params.id } });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
