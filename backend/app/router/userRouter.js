const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.show);
router.post("/signup", userController.create);
router.post("/login", userController.login);
router.delete("/delete/:id", userController.delete);

module.exports = router;
