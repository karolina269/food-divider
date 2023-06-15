const express = require("express");
const router = express.Router();
const dinerController = require("../controllers/dinerController");

router.get("/all", dinerController.index);
router.post("/add", dinerController.create);
// router.get("/:id", dinerController.show);
router.post("/edit/:id", dinerController.update);
router.delete("/delete/:id", dinerController.delete);

module.exports = router;
