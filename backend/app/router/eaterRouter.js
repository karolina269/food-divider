const express = require("express");
const router = express.Router();
const eaterController = require("../controllers/eaterController");

router.get("/all", eaterController.index);
router.post("/add", eaterController.create);
router.get("/:id", eaterController.show);
router.post("/edit/:id", eaterController.update);
router.delete("/delete/:id", eaterController.delete);

module.exports = router;
