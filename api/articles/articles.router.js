const express = require("express");
const articlesController = require("./articles.controller");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.post("/", authenticate, articlesController.create);
router.put("/:id", authenticate, articlesController.update);
router.delete("/:id", authenticate, articlesController.delete);

module.exports = router;
