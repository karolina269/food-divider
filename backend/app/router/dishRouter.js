const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");

router.get("/all", dishController.index);
router.post("/add", dishController.create);
router.post("/edit/:id", dishController.update);
router.delete("/delete/:id", dishController.delete);

module.exports = router;
