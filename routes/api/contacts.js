const express = require("express");
const { auth } = require("../../middewares/auth");
const router = express.Router();
const controller = require("../../controllers/contacts.js");

router.get("/", auth, controller.get);

router.get("/contacts/:contactId", auth, controller.getById);

router.post("/contacts", auth, controller.add);

router.delete("/contacts/:contactId", auth, controller.remove);

router.put("/contacts/:contactId", auth, controller.update);

router.patch("/contacts/:contactId/favorite", auth, controller.updateStatus);

router.post("/users/register", controller.createUserController);

router.post("/users/login", controller.loginUserController);

router.get("/users/logout", auth, controller.logoutUserController);

router.get("/users/current", auth, controller.getUsersController);

module.exports = router;