const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");

router.get("/all", dishController.index);
router.get("/:id", dishController.show);
router.post("/add", dishController.create);
router.post("/edit/:id", dishController.update);
router.post("/select/:id", dishController.select);
router.post("/unselect/:id", dishController.unselect);
router.delete("/delete/:id", dishController.delete);

module.exports = router;
