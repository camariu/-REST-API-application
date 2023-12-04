const express = require("express");

const router = express.Router();
const controller = require("../../controllers/contacts")

router.get("/", controller.get);

router.get("/:contactId", controller.getById);

router.post("/", controller.create);

router.delete("/:contactId", controller.remove);

router.put("/:contactId", controller.update);

router.patch("/:contactId/favorite", controller.updateStatus);

module.exports = router